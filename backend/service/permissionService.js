const constant = require("../constant");
const Permission = require("../database/models/permissionModel");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectId;

module.exports.createPermission = async (serviceData) => {
  try {
    let data = new Permission({ ...serviceData });
    const exist = await Permission.find(
      { typeId: data.typeId },
      { tokenID: data.tokenID }
    );
    if (exist.length != 0) {
      throw new Error(constant.PermssionMessage.PERMISSION_DUPLICATE);
    }
    let result = await data.save();
    return formatMongoData(result);
  } catch (err) {
    console.log("something went wrong: service > Permission Service ", err);
    throw new Error(err);
  }
};

module.exports.getAllPermission = async () => {
  try {
    return await Permission.find().populate({
      path: "tokenID",
    });
  } catch (err) {
    console.log(
      "something went wrong: service > Get All Permission Service",
      err
    );
    throw new Error(err);
  }
};

module.exports.getAllUserPermission = async ({ roletype }) => {
  try {
    return await Permission.aggregate([
      {
        $group: {
          _id: {
            typeId: "$typeId",
            typeName: "$typeName",
            tokens: "$tokenId",
          },
        },
      },
      {
        $addFields: {
          Permissions: "$_id",
          _id: "$$REMOVE",
        },
      },
    ]);
  } catch (err) {
    console.log(
      "something went wrong: service > Get All User Permission Service",
      err
    );
    throw new Error(err);
  }
};
