const constant = require("../constant");
const resourceRoleMasterModel = require("../database/models/resourceRoleMaster");
const estResourcePlanningModel = require("../database/models/estResourcePlanning");
const EstimationHeader = require("../database/models/estHeaderModel");
const EstResourceCount = require("../database/models/estResourceCount");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const ResourceCountRepository = require("../repository/estResourceCountRepository");

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
    return await ResourceCountRepository.GetResourceCountResourceData(
      resourceCountId
    );
  } catch (err) {
    console.log(
      "something went wrong: service > resource RoleMasterService ",
      err
    );
    throw new Error(err);
  }
};
