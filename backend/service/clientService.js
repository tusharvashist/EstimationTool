const constant = require("../constant");
const Client = require("../database/models/clientModel");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");
const { populate } = require("../database/models/clientModel");

module.exports.createClient = async (serviceData) => {
  try {
    let client = new Client({ ...serviceData });
    client.createdBy = global.loginId;
    const findRecord = await Client.find({ clientName: client.clientName });
    if (findRecord.length != 0) {
      throw new Error(constant.clientMessage.DUPLICATE_CLIENT);
    }

    let result = await client.save();
    return formatMongoData(result);
  } catch (err) {
    console.log(
      "something went wrong: service > clientService > createClient ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getAllClient = async ({ skip = 0, limit = 10 }) => {
  try {
    let clients = await Client.find()
      .populate({ path: "createdBy updatedBy" })
      .sort({ updatedAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    return formatMongoData(clients);
  } catch (err) {
    console.log(
      "something went wrong: service > clientService > getAllClient ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getClientById = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.clientMessage.INVALID_ID);
    }
    let clients = await Client.findById(id)
      .populate({
        path: "projects",
        populate: { path: "createdBy updatedBy" },
        options: { sort: { updatedAt: -1 } },
      })
      .populate({ path: "createdBy" })
      .populate({ path: "updatedBy" });

    if (!clients) {
      throw new Error(constant.clientMessage.CLIENT_NOT_FOUND);
    }
    return formatMongoData(clients);
  } catch (err) {
    console.log(
      "something went wrong: service > clientService > getClientById ",
      err
    );
    throw new Error(err);
  }
};

module.exports.clientUpdate = async ({ id, updateInfo }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.projectMessage.INVALID_ID);
    }
    const findRecord = await Client.find({ clientName: updateInfo.clientName });
    updateInfo.updatedBy = global.loginId;
    let clients;
    if (findRecord.length != 0) {
      if (findRecord.length == 1 && String(findRecord[0]._id) == id) {
        clients = await Client.findOneAndUpdate({ _id: id }, updateInfo, {
          new: true,
        });
        if (!clients) {
          throw new Error(constant.clientMessage.CLIENT_NOT_FOUND);
        }
        return formatMongoData(clients);
      } else {
        throw new Error(constant.clientMessage.DUPLICATE_CLIENT);
      }
    }

    clients = await Client.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!clients) {
      throw new Error(constant.clientMessage.CLIENT_NOT_FOUND);
    }
    return formatMongoData(clients);
  } catch (err) {
    console.log(
      "something went wrong: service > clientService > clientUpdate ",
      err
    );
    throw new Error(err);
  }
};

module.exports.clientDelete = async ({ id }) => {
  try {
    let clients = await Client.updateOne(
      { _id: id },
      { isDeleted: true, updatedBy: global.loginId }
    );

    if (!clients) {
      throw new Error(constant.clientMessage.CLIENT_NOT_FOUND);
    }
    return formatMongoData(clients);
  } catch (err) {
    console.log(
      "something went wrong: service > clientService > clientDelete ",
      err
    );
    throw new Error(err);
  }
};
