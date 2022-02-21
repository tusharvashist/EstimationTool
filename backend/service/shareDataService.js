const constant = require("../constant");
const ShareDataModel = require("../database/models/shareDataModel");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");

module.exports.createShareData = async (serviceData) => {
  try {
    let module = new ShareDataModel({ ...serviceData });
    console.log(module);
    let exits = await ShareDataModel.find({ moduleName: module.moduleName });
    if (exits.length == 0) {
      let result = await module.save();
      return formatMongoData(result);
    }
  } catch (err) {
    console.log("something went wrong: service > Module Master Service ", err);
    throw new Error(err);
  }
};
