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
      let estResourceCount =
        await ResourceCountRepository.getEstResourceCountByAttrId(
          mongoose.Types.ObjectId(element._id)
        );
      console.log(estResourceCount);
      if (estResourceCount) {
        estResourceCount.resourceCount =
          element.Total /
          (global.ResourceWeekHours * estimation.estTentativeTimeline);
        let estimationCalcAttr = EstResourceCount.findOneAndUpdate(
          { _id: estResourceCount._id },
          estResourceCount,
          { new: true }
        );
      } else {
        let estResourceCount = new EstResourceCount();
        estResourceCount.estAttributeId = element._id;
        estResourceCount.estHeaderId = estheaderid;
        estResourceCount.resourceCount =
          element.Total /
          (global.ResourceWeekHours * estimation.estTentativeTimeline);
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
        estResourceCount.resourceCount =
          element.Total /
          (global.ResourceWeekHours * estimation.estTentativeTimeline);
        let estimationCalcAttr = EstResourceCount.findOneAndUpdate(
          { _id: estResourceCount._id },
          estResourceCount,
          { new: true }
        );
      } else {
        let estResourceCount = new EstResourceCount();
        estResourceCount.estCalcId = element._id;
        estResourceCount.estHeaderId = estheaderid;
        estResourceCount.resourceCount =
          element.Total /
          (global.ResourceWeekHours * estimation.estTentativeTimeline);
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
