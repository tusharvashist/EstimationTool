const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");
const assumptionRepository = require("../repository/consolidatedAssumptionRepository");

module.exports.createConsolidatedAssumption = async (serviceData) => {
  try {
    let result = await assumptionRepository.createConsolidatedAssumption(
      serviceData
    );
    return formatMongoData(result);
  } catch (err) {
    console.log(
      "something went wrong: service > consolidatedAssumption > createConsolidatedAssumption ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getTag = async () => {
  try {
    let assumptionTag = await assumptionRepository.getTag();
    return formatMongoData(assumptionTag);
  } catch (err) {
    console.log(
      "something went wrong: service > consolidatedAssumption > getTag ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getConsolidatedAssumption = async () => {
  try {
    let assumption = await assumptionRepository.getConsolidatedAssumption();
    return formatMongoData(assumption);
  } catch (err) {
    console.log(
      "something went wrong: service > consolidatedAssumption > getConsolidatedAssumption",
      err
    );
    throw new Error(err);
  }
};

module.exports.updateAssumption = async (req) => {
  try {
    let updatedAssumption = await assumptionRepository.putUpdatedAssumption(
      req.body
    );
    return formatMongoData(updatedAssumption);
  } catch (err) {
    console.log(
      "something went wrong: service > consolidatedAssumption > updateAssumption",
      err
    );
    throw new Error(err);
  }
};
