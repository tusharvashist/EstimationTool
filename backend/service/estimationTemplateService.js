const EstimationTemplate = require("../database/models/estimationTemplateModel");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");

module.exports.createEstimationTemplate = async (serviceData) => {
  try {
    let estimationTemplate = new EstimationTemplate({ ...serviceData });
    let result = await estimationTemplate.save();
    return formatMongoData(result);
  } catch (err) {
    console.log(
      "something went wrong: service > EstimationTemplateService ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getAllEstimationTemplate = async ({ skip = 0, limit = 10 }) => {
  try {
    let estimationTemplate = await EstimationTemplate.find({ isDeleted: false })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return formatMongoData(estimationTemplate);
  } catch (err) {
    console.log("something went wrong: service > EstimationTemplate ", err);
    throw new Error(err);
  }
};
