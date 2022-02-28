const constant = require("../constant");
const Assumption = require("../database/models/Assumption");
const AssumptionTag = require("../database/models/AssumptionTag");
const mongoose = require("mongoose");

exports.createConsolidatedAssumption = async (serviceData) => {
  try {
    let assumption = new Assumption({
      assumption: serviceData.assumption,
      assumptionTag: serviceData.assumptionTag,
      isDeleted: false,
    });
    const findRecord = await Assumption.find({
      assumption: assumption.assumption,
    });
    if (findRecord.length != 0) {
      throw new Error(constant.clientMessage.DUPLICATE_CLIENT);
    }
    let result = await assumption.save();
    return result;
  } catch (err) {
    console.log(
      "something went wrong: service > clientService > createClient ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getTag = async () => {
  try {
    let assumptionTag = await AssumptionTag.find();
    return assumptionTag;
  } catch (err) {
    console.log("something went wrong: service > Role Master Service ", err);
    throw new Error(err);
  }
};

module.exports.getConsolidatedAssumption = async () => {
  try {
    let assumption = await Assumption.find().populate({
      path: "assumptionTag",
    });
    return assumption;
  } catch (err) {
    console.log(
      "something went wrong: service > ProjectService > getAllProject",
      err
    );
    throw new Error(err);
  }
};

module.exports.putUpdatedAssumption = async (req) => {
  try {
    return await Assumption.findByIdAndUpdate(req.assumptionId, {
      assumption: req.assumptionName,
      assumptionTag: req.assumptionTag,
    });
  } catch (err) {
    console.log(
      "something went wrong: service > assumptionRepository > putUpdatedAssumption",
      err
    );
    throw new Error(err);
  }
};
