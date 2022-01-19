const constant = require("../constant");
const LocationMaster = require("../database/models/locationmaster");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");
const EstHeaderModel = require("../database/models/estHeaderModel");
const { exist } = require("joi");

module.exports.getAllEstmationHeaderLocation = async ({ estHeaderId }) => {
  try {
    let locations = await LocationMaster.aggregate().addFields({
      selected: false,
    });

    if (estHeaderId != "") {
      let estlocation = await EstHeaderModel.findById(estHeaderId);
      estlocation.locations.forEach((element) => {
        let exists = locations.filter((x) => String(x._id) == String(element));
        if (exists.length > 0) {
          exists[0].selected = true;
        }
      });
    }

    return locations;
  } catch (err) {
    console.log(
      "something went wrong: service > Get Locations from Estimation Header ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getAllLocations = async () => {
  try {
    let lst = await LocationMaster.find();
    return lst;
  } catch (err) {
    throw new Error(err);
  }
};
