const constant = require("../constant");
const { ObjectId } = require("mongodb");
const EstResourceCount = require("../database/models/estResourceCount");
const mongoose = require("mongoose");
const EstResourcePlanning = require("../database/models/estResourcePlanning");

module.exports.getEstResourceCountByAttrId = async (
  estAttributeId,
  estheaderid
) => {
  return EstResourceCount.findOne({
    estAttributeId: estAttributeId,
    estHeaderId: estheaderid,
  });
};

module.exports.getEstResourceCountByCalcAttrId = async (
  estcalcAttributeId,
  estheaderid
) => {
  return EstResourceCount.findOne({
    estCalcId: estcalcAttributeId,
    estHeaderId: estheaderid,
  });
};

module.exports.getEstResourceCountByHeaderId = async (estheaderid) => {
  return EstResourceCount.find({
    estHeaderId: estheaderid,
  });
};

module.exports.updateResourceCount = async (
  updateResourceCount,
  resourceCount,
  estimation
) => {
  updateResourceCount.resourceCount =
    resourceCount.Total /
    (global.ResourceWeekHours * estimation.estTentativeTimeline);

  return EstResourceCount.findOneAndUpdate(
    { _id: updateResourceCount._id },
    updateResourceCount,
    { new: true }
  );
};

module.exports.createResourceCount = async (
  resourceCount,
  estimation,
  type
) => {
  let estResourceCount = new EstResourceCount();
  if (type == "attribute") {
    estResourceCount.estAttributeId = resourceCount._id;
  } else {
    estResourceCount.estCalcId = resourceCount._id;
  }
  estResourceCount.estHeaderId = estimation._id;
  estResourceCount.resourceCount =
    resourceCount.Total /
    (global.ResourceWeekHours * estimation.estTentativeTimeline);
  estResourceCount.save();

  return estResourceCount;
};

module.exports.updateAttResourceCount = (EstimationAttributes, estimation) => {
  EstimationAttributes.forEach(async (element) => {
    let estResourceCount = await this.getEstResourceCountByAttrId(
      mongoose.Types.ObjectId(element._id)
    );
    console.log(estResourceCount);
    if (estResourceCount) {
      await this.updateResourceCount(estResourceCount, element, estimation);
    } else {
      await this.createResourceCount(element, estimation, "attribute");
    }
  });
};

module.exports.updateCalcAttResourceCount = (
  EstimationCalcAttributes,
  estimation
) => {
  EstimationCalcAttributes.forEach(async (element) => {
    let estResourceCount = await this.getEstResourceCountByCalcAttrId(
      mongoose.Types.ObjectId(element._id)
    );
    console.log(estResourceCount);
    if (estResourceCount) {
      await this.updateResourceCount(estResourceCount, element, estimation);
    } else {
      await this.createResourceCount(element, estimation, "calc");
    }
  });
};

module.exports.getResourceMixData = async (estheaderid) => {
  return EstResourcePlanning.aggregate([
    {
      $match: {
        estHeaderId: ObjectId(estheaderid),
      },
    },
    {
      $lookup: {
        from: "resourcerolemasters",
        localField: "resourceRoleID",
        foreignField: "_id",
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
      $addFields: {
        resourceRole: "$resourcelist.resourceRole",
      },
    },
    {
      $group: {
        _id: {
          estAttributeId: "$estAttributeId",
          estCalcId: "$estCalcId",
          resourceRoleID: "$resourceRoleID",
          resourceRole: "$resourceRole",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        estAttributeId: "$_id.estAttributeId",
        estCalcId: "$_id.estCalcId",
        resourceRoleID: "$_id.resourceRoleID",
        resourceRole: "$_id.resourceRole",
        count: "$count",
        _id: 0,
      },
    },
  ]);
};
