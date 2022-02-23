const constant = require("../constant");
const ShareDataModel = require("../database/models/shareDataModel");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");

module.exports.createShareData = async (serviceData) => {
  try {
    for (let estimation of serviceData.Estimations) {
      for (let user of serviceData.Users) {
        let sharedata = new ShareDataModel({
          typeId: estimation.id,
          typeName: "E",
          roleId: serviceData.RoleId,
          ownerUserId: global.loginId,
          shareUserId: user.id,
        });
        await ShareDataModel.deleteMany({
          typeId: estimation.id,
          shareUserId: user.id,
          typeName: "E"
        });
        await sharedata.save();
      }
    }
  } catch (err) {
    console.log("something went wrong: service > Sharing Data Service ", err);
    throw new Error(err);
  }
};
