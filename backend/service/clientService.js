
const constant = require("../constant")
const Client = require("../database/models/clientModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")

module.exports.createClient = async (serviceData) => {
  try {
    let client = new Client({ ...serviceData })
    let result = await client.save();
    return formatMongoData(result)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}


module.exports.getAllClient = async ({ skip = 0, limit = 10 }) => {
  try {
    let clients = await Client.find().skip(parseInt(skip)).limit(parseInt(limit));

    return formatMongoData(clients)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}

module.exports.getClientById = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.clientMessage.INVALID_ID)
    }
    let clients = await Client.findById(id).populate({ path: 'projects' });
    if (!clients) {
      throw new Error(constant.clientMessage.CLIENT_NOT_FOUND)
    }
    return formatMongoData(clients)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}

module.exports.clientUpdate = async ({ id, updateInfo }) => {
  try {

    let clients = await Client.findOneAndUpdate({ _id: id }, updateInfo, { new: true });
    if (!clients) {
      throw new Error(constant.clientMessage.CLIENT_NOT_FOUND)
    }
    return formatMongoData(clients)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}


module.exports.clientDelete = async ({ id }) => {
  try {

    let clients = await Client.updateOne({ _id: id }, { isDeleted: true });

    if (!clients) {
      throw new Error(constant.clientMessage.CLIENT_NOT_FOUND)
    }
    return formatMongoData(clients)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}