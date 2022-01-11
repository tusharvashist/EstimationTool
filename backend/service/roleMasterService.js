const constant = require("../constant");
const Role = require("../database/models/roleMasterModel");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");

module.exports.createRole = async (serviceData) => {
  try {
    let role = new Role({ ...serviceData });
    let result = await role.save();
    return formatMongoData(result);
  } catch (err) {
    console.log("something went wrong: service > RoleMasterService ", err);
    throw new Error(err);
  }
};

module.exports.getAllRole = async ({ skip = 0, limit = 10 }) => {
  try {
    let role = await Role.find({}).skip(parseInt(skip)).limit(parseInt(limit));
    return formatMongoData(role);
  } catch (err) {
    console.log("something went wrong: service > RoleMasterService ", err);
    throw new Error(err);
  }
};

module.exports.getRoleById = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.roleMessage.INVALID_ID);
    }
    let role = await Role.findById(id);
    if (!role) {
      throw new Error(constant.roleMessage.ROLE_NOT_FOUND);
    }
    return formatMongoData(role);
  } catch (err) {
    console.log("something went wrong: service > roleMasterservice ", err);
    throw new Error(err);
  }
};

module.exports.roleUpdate = async ({ id, updateInfo }) => {
  try {
    let role = await Role.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!role) {
      throw new Error(constant.roleMessage.ROLE_NOT_FOUND);
    }
    return formatMongoData(role);
  } catch (err) {
    console.log("something went wrong: service > roleMasterservice ", err);
    throw new Error(err);
  }
};

module.exports.roleDelete = async ({ id }) => {
  try {
    let role = await Role.findByIdAndDelete(id);
    if (!role) {
      throw new Error(constant.roleMessage.ROLE_NOT_FOUND);
    }
    return formatMongoData(role);
  } catch (err) {
    console.log("something went wrong: service > roleservice ", err);
    throw new Error(err);
  }
};
