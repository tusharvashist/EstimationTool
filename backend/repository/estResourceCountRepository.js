const constant = require("../constant");
const { ObjectId } = require("mongodb");
const EstResourceCount = require("../database/models/estResourceCount");
const mongoose = require("mongoose");
const EstResourcePlanning = require("../database/models/estResourcePlanning");
const resourceRoleMasterModel = require("../database/models/resourceRoleMaster");
const estResourcePlanningModel = require("../database/models/estResourcePlanning");
const EstimationHeader = require("../database/models/estHeaderModel");

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

module.exports.GetMasterResourceByLocation = async (techSkillId, estheader) => {
  let masterResource = await resourceRoleMasterModel
    .aggregate([
      {
        $lookup: {
          from: "locationmasters",
          localField: "location",
          foreignField: "_id",
          as: "location",
        },
      },
      {
        $unwind: {
          path: "$location",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "techskillmasters",
          localField: "techskill",
          foreignField: "_id",
          as: "techskill",
        },
      },
      {
        $unwind: {
          path: "$techskill",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "techskill._id": techSkillId,
        },
      },
    ])
    .addFields({ count: 0, defaultAdjusted: false });

  return masterResource.filter((resource) =>
    estheader.locations.some(
      (loc) => String(resource.location._id) === String(loc)
    )
  );
};

module.exports.GetResourceCountResourceData = async (resourceCountId) => {
  let planResource = await estResourcePlanningModel.aggregate([
    {
      $match: {
        estResourceCountID: mongoose.Types.ObjectId(resourceCountId),
      },
    },
    {
      $group: {
        _id: {
          resourceRoleID: "$resourceRoleID",
          defaultAdjusted: "$defaultAdjusted",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  let rescount = await EstResourceCount.findById(ObjectId(resourceCountId));
  let estheader = await EstimationHeader.findById(rescount.estHeaderId);

  let filteredresource = await this.GetMasterResourceByLocation(
    rescount.techSkill,
    estheader
  );

  filteredresource.forEach((element) => {
    let exists = planResource.filter(
      (x) => String(x._id.resourceRoleID) == String(element._id)
    );
    if (exists.length > 0) {
      element.defaultAdjusted = exists[0]._id.defaultAdjusted;
      element.count = exists[0].count;
    }
  });

  return filteredresource;
};
