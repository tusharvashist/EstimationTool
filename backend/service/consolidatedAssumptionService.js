const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");
const RequirementRepository = require("../repository/consolidatedAssumptionRepository");

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