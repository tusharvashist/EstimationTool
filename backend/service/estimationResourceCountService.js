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

module.exports.generateResourceCount = async ({ estheaderid }) => {
  try {
    if (!mongoose.Types.ObjectId(estheaderid)) {
      throw new Error(constant.requirementMessage.INVALID_ID);
    }

    let estHeaderRequirement =
      await RequirementRepository.getAttributesCalAttributesTotal(estheaderid);

    //Delete All Attribute & Cal Attribute which is not currently in use but saved previously.
    console.log(estHeaderRequirement);
    let estimation = await EstimationHeader.findById(estheaderid);

    estHeaderRequirement.EstimationAttributes.forEach(async (element) => {
      if (element.Total == 0) {
        return;
      }
      let estResourceCount =
        await ResourceCountRepository.getEstResourceCountByAttrId(
          mongoose.Types.ObjectId(element._id)
        );

      if (estResourceCount) {
        let resourceCount = (
          element.Total /
          (global.ResourceWeekHours * estimation.estTentativeTimeline)
        ).toFixed(2);

        const filter = { _id: mongoose.Types.ObjectId(estResourceCount._id) };
        const update = {
          resourceCount: resourceCount,
          attributeName: element.attributeName,
        };

        let updateresource = await EstResourceCount.findOneAndUpdate(
          filter,
          update,
          {
            new: true,
          }
        );
      } else {
        let estResourceCount = new EstResourceCount();
        estResourceCount.estAttributeId = element._id;
        estResourceCount.estHeaderId = estheaderid;
        estResourceCount.attributeName = element.attributeName;
        estResourceCount.resourceCount = (
          element.Total /
          (global.ResourceWeekHours * estimation.estTentativeTimeline)
        ).toFixed(2);
        await estResourceCount.save();
      }
    });

    estHeaderRequirement.EstimationCalcAttributes.forEach(async (element) => {
      if (element.Total == 0) {
        return;
      }
      let estResourceCount =
        await ResourceCountRepository.getEstResourceCountByCalcAttrId(
          mongoose.Types.ObjectId(element._id)
        );

      if (estResourceCount) {
        let resourceCount = (
          element.Total /
          (global.ResourceWeekHours * estimation.estTentativeTimeline)
        ).toFixed(2);

        const filter = { _id: mongoose.Types.ObjectId(estResourceCount._id) };
        const update = {
          resourceCount: resourceCount,
          attributeName: element.calcAttributeName,
        };

        let updateresource = await EstResourceCount.findOneAndUpdate(
          filter,
          update,
          {
            new: true,
          }
        );
        console.log(updateresource);
      } else {
        let estResourceCount = new EstResourceCount();
        estResourceCount.estCalcId = element._id;
        estResourceCount.estHeaderId = estheaderid;
        estResourceCount.attributeName = element.calcAttributeName;
        estResourceCount.resourceCount = (
          element.Total /
          (global.ResourceWeekHours * estimation.estTentativeTimeline)
        ).toFixed(2);
        await estResourceCount.save();
      }
    });

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
    // {
    //   $lookup: {
    //     from: "estimationattributes",
    //     localField: "estAttributeId",
    //     foreignField: "_id",
    //     as: "attributes",
    //   },
    // },
    // {
    //   $lookup: {
    //     from: "estimationcalcattrs",
    //     localField: "estCalcId",
    //     foreignField: "_id",
    //     as: "calcattributes",
    //   },
    // },
    {
      $lookup: {
        from: "techskillmasters",
        localField: "techSkill",
        foreignField: "_id",
        as: "skills",
      },
    },
    // {
    //   $unwind: {
    //     path: "$attributes",
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },
    // {
    //   $unwind: {
    //     path: "$attributesCalc",
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },
    {
      $unwind: {
        path: "$skills",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "estresourceplannings",
        localField: "attributes._id",
        foreignField: "estAttributeId",
        as: "resourcelist",
      },
    },
    {
      $unwind: {
        path: "$resourcelist",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "resourcerolemasters",
        localField: "resourcelist.resourceRoleID",
        foreignField: "_id",
        as: "resourcelist.detail",
      },
    },
    {
      $unwind: {
        path: "$resourcelist.detail",
        preserveNullAndEmptyArrays: true,
      },
    },
    // {
    //   $project: {
    //     estHeaderId: 1,
    //     estAttributeId: 1,
    //     estCalcId: 1,
    //     resourceCount: 1,
    //     attributes: 1,
    //     calcattributes: 1,
    //     resourcelist: 1,
    //     skills: 1,
    //   },
    // },
    {
      $group: {
        _id: {
          _id: "$_id",
          resourceCount: "$resourceCount",
          estAttributeId: "$estAttributeId",
          estHeaderId: "$estHeaderId",
          estCalcId: "$estCalcId",
          attributeName: "$attributeName",
          skills: "$skills.skill",
          skillsId: "$skills._id",
        },
        rolecount: {
          $push: {
            roleId: "$resourcelist.detail._id",
            role: "$resourcelist.detail.resourceRole",
            count: { $sum: 1 },
          },
        },
      },
    },
  ]);
  // let result = await EstResourceCount.find({
  //   estHeaderId: mongoose.Types.ObjectId(estheaderid),
  // })
  //   .populate("estAttributeId")
  //   .populate("estCalcId");
  console.log(result);
  return result;
};

module.exports.updateTechnologyResourceCount = async ({ updatedInfo }) => {
  try {
    let filter = {};
    if (updatedInfo.estAttributeId) {
      filter = {
        estAttributeId: mongoose.Types.ObjectId(updatedInfo.estAttributeId),
      };
    } else {
      filter = {
        estCalcId: mongoose.Types.ObjectId(updatedInfo.estCalcId),
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
      };
      groupby = "$estAttributeId";
    } else {
      filter = {
        estCalcId: mongoose.Types.ObjectId(updatedInfo.estCalcId),
      };
      groupby = "$estCalcId";
    }

    if (updatedInfo.qty > 0) {
      //Logic for Resource Count Data check
      let rescount = await EstResourceCount.findOne(filter);

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
          "Resource Planning already done for this resource count data."
        );
      }

      let estResourcePlanning = new EstResourcePlanning();
      estResourcePlanning.defaultAdjusted = updatedInfo.defaultAdjusted;
      estResourcePlanning.estResourceCountID = updatedInfo.estResourceCountID;
      estResourcePlanning.estAttributeId = updatedInfo.estAttributeId;
      estResourcePlanning.estCalcId = updatedInfo.estCalcId;
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
