const constant = require("../constant");
const mongoose = require("mongoose");
const { formatMongoData } = require("../helper/dbhelper");
const ResourceCountRepository = require("../repository/estResourceCountRepository");
const EstHeaderRequirement = require("../database/models/estHeaderRequirement");
const EstRequirementData = require("../database/models/estRequirementData");
const EstimationHeader = require("../database/models/estHeaderModel");
const RequirementRepository = require("../repository/requirementRepository");
const EstResourceCount = require("../database/models/estResourceCount");
const { ObjectId } = require("mongodb");
const EstimationCalcAttr = require("../database/models/estimationCalcAttrModel");
const EstimationAttr = require("../database/models/estimationAttributesModel");
const EstResourcePlanning = require("../database/models/estResourcePlanning");
const { string } = require("joi");

module.exports.generateResourceCount = async ({ estheaderid }) => {
  try {
    if (!mongoose.Types.ObjectId(estheaderid)) {
      throw new Error(constant.requirementMessage.INVALID_ID);
    }

    let estHeaderRequirement =
      await RequirementRepository.getAttributesCalAttributesTotal(estheaderid);

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
        console.log(element.estAttributeId);
        console.log(checkattrexists.length == 0);
        let resultdelete = await EstResourceCount.deleteOne({
          estHeaderId: ObjectId(estheaderid),
          estAttributeId: element.estAttributeId,
        });
      }

      if (element.estCalcId != undefined && checkcalcexists.length == 0) {
        console.log(element.estCalcId);
        console.log(heckcalcexists.length);
        let resultdelete = await EstResourceCount.deleteOne({
          estHeaderId: ObjectId(estheaderid),
          estCalcId: element.estCalcId,
        });
      }
    });

    let estimation = await EstimationHeader.findById(estheaderid);

    //console.log(estimation);
    var bulk = EstResourceCount.collection.initializeUnorderedBulkOp();
    estHeaderRequirement.EstimationAttributes.forEach(async (element) => {
      if (element.Total == 0) {
        return;
      }
      let resourceCount = (
        element.Total /
        (global.ResourceWeekHours * estimation.estTentativeTimeline)
      ).toFixed(2);

      let result = bulk
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
    //console.log(bulk);

    estHeaderRequirement.EstimationCalcAttributes.forEach(async (element) => {
      if (element.Total == 0) {
        return;
      }
      let resourceCount = (
        element.Total /
        (global.ResourceWeekHours * estimation.estTentativeTimeline)
      ).toFixed(2);

      let result = bulk
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
    //console.log(bulk);

    await bulk.execute();

    return estHeaderRequirement;
  } catch (err) {
    //console.log("something went wrong: service > GetEstimation data", err);
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
      },
    },
  ]);

  // let result = await EstResourceCount.find({
  //   estHeaderId: mongoose.Types.ObjectId(estheaderid),
  // }).populate("techSkill");

  let data = await ResourceCountRepository.getResourceMixData(estheaderid);

  data.forEach(async (element) => {
    let exists = {};
    if (element.estAttributeId) {
      exists = result.filter(
        (x) => String(x.estAttributeId) == String(element.estAttributeId)
      );
      if (exists.length > 0) exists[0]["rolecount"].push(element);
    } else if (element.estCalcId) {
      exists = result.filter(
        (x) => String(x.estCalcId) == String(element.estCalcId)
      );
      if (exists.length > 0) exists[0]["rolecount"].push(element);
    }
  });

  console.log(result);
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
    rescount.techSkill = updatedInfo.techSkill;
    let result = rescount.save();

    return formatMongoData(result);
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
    } else {
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
      return estResourcePlanning.save();
    } else {
      let deleted = await EstResourcePlanning.findOneAndDelete({
        filter,
        resourceRoleID: mongoose.Types.ObjectId(updatedInfo.resourceRoleID),
      });
      if (!deleted) {
        //Not To any Remove Resource and throw exception
        throw new Error(
          "All Resource removed for this resource count data " +
            rescount?.resourceCount
        );
      }
      return deleted;
    }
  } catch (err) {
    console.log(
      "something went wrong: service > Update Resource Planning",
      err
    );
    throw new Error(err);
  }
};

calculateResourceCount = async ({ estimation, total }) => {
  return (
    total /
    (global.ResourceWeekHours * estimation.estTentativeTimeline)
  ).toFixed(2);
};
