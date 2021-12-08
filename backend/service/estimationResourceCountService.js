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
    //console.log("GetByID Starts");
    if (!mongoose.Types.ObjectId(estheaderid)) {
      throw new Error(constant.requirementMessage.INVALID_ID);
    }

    let estHeaderRequirement =
      await RequirementRepository.getAttributesCalAttributesTotal(estheaderid);

    let estimation = await EstimationHeader.findById(estheaderid);

    estHeaderRequirement.EstimationAttributes.forEach(async (element) => {
      if (element.Total == 0) {
        return;
      }
      let estResourceCount =
        await ResourceCountRepository.getEstResourceCountByAttrId(
          mongoose.Types.ObjectId(element._id)
        );
      console.log(estResourceCount);
      if (estResourceCount) {
        estResourceCount.resourceCount = (
          element.Total /
          (global.ResourceWeekHours * estimation.estTentativeTimeline)
        ).toFixed(2);
        let estimationCalcAttr = EstResourceCount.findOneAndUpdate(
          { _id: estResourceCount._id },
          estResourceCount,
          { new: true }
        );
      } else {
        let estResourceCount = new EstResourceCount();
        estResourceCount.estAttributeId = element._id;
        estResourceCount.estHeaderId = estheaderid;
        estResourceCount.resourceCount = (
          element.Total /
          (global.ResourceWeekHours * estimation.estTentativeTimeline)
        ).toFixed(2);
        estResourceCount.save();
      }
    });

    estHeaderRequirement.EstimationCalcAttributes.forEach(async (element) => {
      let estResourceCount =
        await ResourceCountRepository.getEstResourceCountByCalcAttrId(
          mongoose.Types.ObjectId(element._id)
        );
      console.log(estResourceCount);
      if (estResourceCount) {
        estResourceCount.resourceCount = (
          element.Total /
          (global.ResourceWeekHours * estimation.estTentativeTimeline)
        ).toFixed(2);
        let estimationCalcAttr = EstResourceCount.findOneAndUpdate(
          { _id: estResourceCount._id },
          estResourceCount,
          { new: true }
        );
      } else {
        let estResourceCount = new EstResourceCount();
        estResourceCount.estCalcId = element._id;
        estResourceCount.estHeaderId = estheaderid;
        estResourceCount.resourceCount = (
          element.Total /
          (global.ResourceWeekHours * estimation.estTentativeTimeline)
        ).toFixed(2);
        estResourceCount.save();
      }
    });

    return estHeaderRequirement;
  } catch (err) {
    //console.log("something went wrong: service > GetEstimation data", err);
    throw new Error(err);
  }
};

module.exports.getResourceCount = async ({ estheaderid }) => {
  // let result = await EstResourceCount.aggregate([
  //   {
  //     $match: {
  //       estHeaderId: mongoose.Types.ObjectId(estheaderid),
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "estimationattributes",
  //       localField: "estAttributeId",
  //       foreignField: "_id",
  //       as: "attributes",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "estimationcalcattrs",
  //       localField: "estCalcId",
  //       foreignField: "_id",
  //       as: "calcattributes",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "techskillmasters",
  //       localField: "techSkill",
  //       foreignField: "_id",
  //       as: "skills",
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$attributes",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$attributesCalc",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$skills",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  // ]);
  let result = await EstResourceCount.find({
    estHeaderId: mongoose.Types.ObjectId(estheaderid),
  })
    .populate("estAttributeId")
    .populate("estCalcId");
  return result;
};

module.exports.updateTechnologyResourceCount = async ({ updatedInfo }) => {
  try {
    let rescount = await EstResourceCount.findById({
      _id: mongoose.Types.ObjectId(updatedInfo._id),
    });
    if (!rescount) {
      throw new Error(constant.requirementMessage.INVALID_ID);
    }
    rescount.techSkill = updatedInfo.techSkill;
    rescount.save();

    return formatMongoData(rescount);
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
    if (updatedInfo.qty > 0) {
      //Logic for Resource Count Data check
      let rescount = await EstResourceCount.findById({
        _id: mongoose.Types.ObjectId(updatedInfo.estResourceCountID),
      });

      //Get Total Resource Mix
      let mixsum = await EstResourcePlanning.aggregate([
        {
          $match: {
            estResourceCountID: mongoose.Types.ObjectId(
              updatedInfo.estResourceCountID
            ),
          },
        },
        {
          $group: {
            _id: "$estResourceCountID",
            sum: { $sum: 1 },
          },
        },
      ]);

      let maxcount = Math.ceil(rescount.resourceCount);

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
        estResourceCountID: mongoose.Types.ObjectId(
          updatedInfo.estResourceCountID
        ),
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
