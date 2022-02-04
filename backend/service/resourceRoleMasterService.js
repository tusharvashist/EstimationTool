const constant = require("../constant");
const resourceRoleMasterModel = require("../database/models/resourceRoleMaster");
const estResourcePlanningModel = require("../database/models/estResourcePlanning");
const EstimationHeader = require("../database/models/estHeaderModel");
const EstResourceCount = require("../database/models/estResourceCount");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

module.exports.createResourceRoleMaster = async (serviceData) => {
  try {
    let roleMaster = new resourceRoleMasterModel({ ...serviceData });

    let result = await roleMaster.save();
    return formatMongoData(result);
  } catch (err) {
    console.log(
      "something went wrong: service >resourceRole master Service ",
      err
    );
    throw new Error(err);
  }
};

module.exports.createEstResourcePlanning = async (serviceData) => {
  try {
    let estimationTemplate = new estResourcePlanningModel({ ...serviceData });
    let result = await estimationTemplate.save();

    return formatMongoData(result);
  } catch (err) {
    console.log(
      "something went wrong: service est resource planning service ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getAllResources = async ({ resourceCountId }) => {
  try {
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
            "techskill._id": rescount.techSkill,
          },
        },
      ])
      .addFields({ count: 0, defaultAdjusted: false });

    let filteredresource = masterResource.filter((resource) =>
      estheader.locations.some(
        (loc) => String(resource.location._id) === String(loc)
      )
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
  } catch (err) {
    console.log(
      "something went wrong: service > resource RoleMasterService ",
      err
    );
    throw new Error(err);
  }
};
