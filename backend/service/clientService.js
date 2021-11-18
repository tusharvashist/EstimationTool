
const constant = require("../constant")
const Client = require("../database/models/clientModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")

module.exports.createClient = async (serviceData) => {
  try {
    let client = new Client({ ...serviceData })
    const findRecord = await Client.find({clientName :  client.clientName });
    if(findRecord.length != 0){
         throw new Error(constant.clientMessage.DUPLICATE_CLIENT);
    }

    let result = await client.save();
    return formatMongoData(result)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}


module.exports.getAllClient = async ({ skip = 0, limit = 10 }) => {
  try {
    let clients = await Client.find().sort({updatedAt : -1}).skip(parseInt(skip)).limit(parseInt(limit));

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
    let clients = await Client.findById(id)
    .populate(
      { path: 'projects',
        options: { sort: {updatedAt:-1}} 
      });
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
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.projectMessage.INVALID_ID);
    }
    const findRecord = await Client.find({clientName :  updateInfo.clientName });
    if (findRecord.length != 0) {
      if (findRecord.length == 1 && String(findRecord[0]._id) == id) {
         let clients = await Client.findOneAndUpdate({ _id: id }, updateInfo, { new: true });
          if (!clients) {
               throw new Error(constant.clientMessage.CLIENT_NOT_FOUND)
           }
          return formatMongoData(clients)
      } else {
        
      throw new Error(constant.clientMessage.DUPLICATE_CLIENT);
      }

      }

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