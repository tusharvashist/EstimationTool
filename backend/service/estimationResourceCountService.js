const constant = require("../constant");
const mongoose = require("mongoose");
const { formatMongoData } = require("../helper/dbhelper");
const ResourceCountRepository = require("../repository/estResourceCountRepository");
const EstimationHeader = require("../database/models/estHeaderModel");
const RequirementRepository = require("../repository/requirementRepository");
const EstResourceCount = require("../database/models/estResourceCount");
const { ObjectId } = require("mongodb");
const EstResourcePlanning = require("../database/models/estResourcePlanning");
const { string } = require("joi");

module.exports.generateResourceCount = async ({ estheaderid }) => {
  try {
    if (!mongoose.Types.ObjectId(estheaderid)) {
      throw new Error(constant.requirementMessage.INVALID_ID);
    }

    let estHeaderRequirement =
      await RequirementRepository.getAttributesCalAttributesTotal(estheaderid);

    estHeaderRequirement.EstimationAttributes =
      estHeaderRequirement.EstimationAttributes.filter(
        (item) => item.Total > 0
      );
    estHeaderRequirement.EstimationCalcAttributes =
      estHeaderRequirement.EstimationCalcAttributes.filter(
        (item) => item.Total > 0
      );

    //Delete All Attribute & Cal Attribute which is not currently in use but saved previously.
    let rescountList = await EstResourceCount.find({
      estHeaderId: ObjectId(estheaderid),
    });

    rescountList.forEach(async (element) => {
      let checkattrexists = estHeaderRequirement.EstimationAttributes.filter(
        (x) => String(x._id) == String(element.estAttributeId)
      );
      let checkcalcexists =
        estHeaderRequirement.EstimationCalcAttributes.filter(
          (x) => String(x._id) == String(element.estCalcId)
        );

      if (element.estAttributeId != undefined && checkattrexists.length == 0) {
        await EstResourceCount.deleteOne({
          estHeaderId: ObjectId(estheaderid),
          estAttributeId: element.estAttributeId,
        });
        // remove resource allocation
        let deleted = await EstResourcePlanning.deleteMany({
          estHeaderId: ObjectId(estheaderid),
          estAttributeId: element.estAttributeId,
        });
      }

      if (element.estCalcId != undefined && checkcalcexists.length == 0) {
        await EstResourceCount.deleteOne({
          estHeaderId: ObjectId(estheaderid),
          estCalcId: element.estCalcId,
        });
        // remove resource allocation
        let deleted = await EstResourcePlanning.deleteMany({
          estHeaderId: ObjectId(estheaderid),
          estCalcId: element.estCalcId,
        });
      }
    });

    let estimation = await EstimationHeader.findById(estheaderid);

    var bulk = EstResourceCount.collection.initializeUnorderedBulkOp();
    estHeaderRequirement.EstimationAttributes.forEach(async (element) => {
      if (element.Total == 0) {
        return;
      }
      let resourceCount = (
        element.Total /
        (global.ResourceWeekHours * estimation.estTentativeTimeline)
      ).toFixed(2);

      bulk
        .find({
          estHeaderId: ObjectId(estheaderid),
          estAttributeId: element._id,
        })
        .upsert()
        .updateOne(
          {
            $set: {
              resourceCount: resourceCount,
              attributeName: element.attributeName,
            },
          },
          { upsert: false, new: false }
        );
    });

    estHeaderRequirement.EstimationCalcAttributes.forEach(async (element) => {
      if (element.Total == 0) {
        return;
      }
      let resourceCount = (
        element.Total /
        (global.ResourceWeekHours * estimation.estTentativeTimeline)
      ).toFixed(2);

      bulk
        .find({
          estHeaderId: ObjectId(estheaderid),
          estCalcId: element._id,
        })
        .upsert()
        .updateOne(
          {
            $set: {
              resourceCount: resourceCount,
              attributeName: element.calcAttributeName,
            },
          },
          { upsert: false, new: false }
        );
    });
    if (bulk.length > 0) await bulk.execute();

    return estHeaderRequirement;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getResourceCount = async ({ estheaderid }) => {
  let result = await EstResourceCount.aggregate([
    {
      $match: {
        estHeaderId: mongoose.Types.ObjectId(estheaderid),
      },
    },
    {
      $lookup: {
        from: "techskillmasters",
        localField: "techSkill",
        foreignField: "_id",
        as: "skills",
      },
    },
    {
      $unwind: {
        path: "$skills",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: "$_id",
        resourceCount: "$resourceCount",
        estAttributeId: "$estAttributeId",
        estHeaderId: "$estHeaderId",
        estCalcId: "$estCalcId",
        attributeName: "$attributeName",
        skills: "$skills.skill",
        skillsId: "$skills._id",
      },
    },
    {
      $addFields: {
        rolecount: [],
        validationerror: false,
      },
    },
  ]);

  for (let element of result) {
    //Add Role master data in RoleCount
    if (String(element.skillsId).length > 0) {
      element.rolecount =
        await ResourceCountRepository.GetResourceCountResourceData(element._id);
    }
    if (element.rolecount.length > 0) {
      var count = element.rolecount
        .map((resplan) => resplan.count)
        .reduce((acc, resplan) => resplan + acc);
      let maxcount = Math.ceil(element?.resourceCount);
      if (maxcount != count) {
        element.validationerror = true;
      }
    } else {
      element.validationerror = true;
    }
  }

  return result;
};

module.exports.updateTechnologyResourceCount = async ({ updatedInfo }) => {
  try {
    let filter = {};
    if (updatedInfo.estAttributeId) {
      filter = {
        estAttributeId: mongoose.Types.ObjectId(updatedInfo.estAttributeId),
        estHeaderId: mongoose.Types.ObjectId(updatedInfo.estHeaderId),
      };
    } else {
      filter = {
        estCalcId: mongoose.Types.ObjectId(updatedInfo.estCalcId),
        estHeaderId: mongoose.Types.ObjectId(updatedInfo.estHeaderId),
      };
    }

    let rescount = await EstResourceCount.findOne(filter);
    if (!rescount) {
      throw new Error(constant.requirementMessage.INVALID_ID);
    }
    let teckSkill = String(rescount.techSkill);
    rescount.techSkill = updatedInfo.techSkill;
    let result = await rescount.save();
    if (teckSkill != updatedInfo.techSkill && result) {
      //Remove All Resource Allocation from this Resource Count Record
      await EstResourcePlanning.deleteMany({
        $and: [filter],
      });
    }
    return await ResourceCountRepository.GetResourceCountResourceData(
      rescount.estResourceCountID
    );
  } catch (err) {
    console.log(
      "something went wrong: service > Update Resource Count Technology ",
      err
    );
    throw new Error(err);
  }
};

module.exports.updateResourcePlanning = async ({ updatedInfo }) => {
  try {
    let filter = {};
    let groupby = "";
    if (updatedInfo.estAttributeId) {
      filter = {
        estAttributeId: mongoose.Types.ObjectId(updatedInfo.estAttributeId),
        estHeaderId: mongoose.Types.ObjectId(updatedInfo.estHeaderId),
      };
      groupby = "$estAttributeId";
    } else if (updatedInfo.estCalcId) {
      filter = {
        estCalcId: mongoose.Types.ObjectId(updatedInfo.estCalcId),
        estHeaderId: mongoose.Types.ObjectId(updatedInfo.estHeaderId),
      };
      groupby = "$estCalcId";
    }
    let rescount = await EstResourceCount.findOne(filter);
    if (updatedInfo.qty > 0) {
      //Logic for Resource Count Data check

      //Get Total Resource Mix
      let mixsum = await EstResourcePlanning.aggregate([
        {
          $match: filter,
        },
        {
          $group: {
            _id: groupby,
            sum: { $sum: 1 },
          },
        },
      ]);

      let maxcount = Math.ceil(rescount?.resourceCount);

      let totalresource = 0;
      if (mixsum.length > 0) {
        totalresource = mixsum[0].sum;
      }
      let mincount = rescount.resourceCount - totalresource;

      if (totalresource >= maxcount) {
        //Not To any Add Resource and throw exception
        throw new Error(
          "Resource Planning already done for this resource count " +
            rescount?.resourceCount
        );
      }

      let estResourcePlanning = new EstResourcePlanning();
      estResourcePlanning.defaultAdjusted = updatedInfo.defaultAdjusted;
      estResourcePlanning.estResourceCountID = updatedInfo.estResourceCountID;
      estResourcePlanning.estAttributeId = updatedInfo.estAttributeId;
      estResourcePlanning.estCalcId = updatedInfo.estCalcId;
      estResourcePlanning.estHeaderId = updatedInfo.estHeaderId;
      estResourcePlanning.resourceRoleID = updatedInfo.resourceRoleID;
      //Then check for allocation percentage
      this.SetAllocationPercent(mincount, estResourcePlanning);
      estResourcePlanning.save();
    } else if (updatedInfo.qty < 0) {
      let deleted = await EstResourcePlanning.findOneAndDelete({
        $and: [
          filter,
          {
            resourceRoleID: mongoose.Types.ObjectId(updatedInfo.resourceRoleID),
          },
        ],
      });
      if (!deleted) {
        //Not To any Remove Resource and throw exception
        throw new Error(
          "All Resource removed for this resource count data " +
            rescount?.resourceCount
        );
      }
    }
    //Update only defaultAdjusted flag
    await SetResourceDefaultAdjusted(filter, updatedInfo.defaultAdjusted);
    return await ResourceCountRepository.GetResourceCountResourceData(
      updatedInfo.estResourceCountID
    );
  } catch (err) {
    console.log(
      "something went wrong: service > Update Resource Planning",
      err
    );
    throw new Error(err);
  }

  async function SetResourceDefaultAdjusted(filter, defaultAdjusted) {
    if (defaultAdjusted) {
      //Set False
      await EstResourcePlanning.updateMany(
        {
          $and: [filter],
        },
        { $set: { defaultAdjusted: false } }
      );
      //Set True
      await EstResourcePlanning.updateMany(
        {
          $and: [
            filter,
            {
              resourceRoleID: mongoose.Types.ObjectId(
                updatedInfo.resourceRoleID
              ),
            },
          ],
        },
        { $set: { defaultAdjusted: defaultAdjusted } }
      );
    }
  }
};

const calculateResourceCount = async ({ estimation, total }) => {
  return (
    total /
    (global.ResourceWeekHours * estimation.estTentativeTimeline)
  ).toFixed(2);
};
module.exports.SetAllocationPercent = (mincount, estResourcePlanning) => {
  switch (true) {
    case mincount <= 0.25:
      estResourcePlanning.allocationPercent = 25;
      break;
    case mincount <= 0.5:
      estResourcePlanning.allocationPercent = 50;
      break;
    case mincount <= 0.75:
      estResourcePlanning.allocationPercent = 75;
      break;
    default:
      estResourcePlanning.allocationPercent = 100;
  }
};
