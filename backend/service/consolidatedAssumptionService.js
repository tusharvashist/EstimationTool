const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");
const RequirementRepository = require("../repository/consolidatedAssumptionRepository");
const constant = require("../constant");

module.exports.createConsolidatedAssumption = async (serviceData) => {
  try {
    let result = await RequirementRepository.createConsolidatedAssumption(serviceData);
    return formatMongoData(result);
  } catch (err) {
    console.log( "something went wrong: service > clientService > createClient ", err );
    throw new Error(err);
  }
};

module.exports.getTag = async () => {
  try {
    let assumptionTag = await RequirementRepository.getTag();
    return formatMongoData(assumptionTag);
  } catch (err) {
    console.log("something went wrong: service > Role Master Service ", err);
    throw new Error(err);
  }
};



module.exports.getConsolidatedAssumption = async () => {
  try {
    let assumption = await RequirementRepository.getConsolidatedAssumption();
    return formatMongoData(assumption);
  } catch (err) {
    console.log(
      "something went wrong: service > ProjectService > getAllProject",
      err
    );
    throw new Error(err);
  }
};





module.exports.linkAssumptionWithEstimation = async ({ id, updateInfo }) => {
  try {
     let assumption = await RequirementRepository.linkAssumptionWithEstimation({ id, updateInfo });
    return formatMongoData(assumption);
  } catch (err) {
    console.log(
      "something went wrong: service > clientService > clientUpdate ",
      err
    );
    throw new Error(err);
  }
};



module.exports.getLinkAssumptionWithEstimation = async (id) => {
  try {
       if (!mongoose.Types.ObjectId(id)) {
         throw new Error(constant.projectMessage.INVALID_ID);
        }
    
    let assumption = await RequirementRepository.getLinkAssumptionWithEstimation(id);
    let response = { ...constant.consolidatedAssumption };
    response.assumption = assumption;
    return formatMongoData(response);
    
  } catch (err) {
    console.log(
      "something went wrong: service > clientService > clientUpdate ",
      err
    );
    throw new Error(err);
  }
};