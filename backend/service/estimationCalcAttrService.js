const constant = require("../constant");
const EstimationCalcAttr = require("../database/models/estimationCalcAttrModel");
const Client = require("../database/models/clientModel");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");

module.exports.createEstimationCalcAttr = async (serviceData) => {
  try {
    let estimationCalcAttr = new EstimationCalcAttr({ ...serviceData });
    const findRecord = await EstimationCalcAttr.find({
      calcAttributeName: estimationCalcAttr.calcAttributeName,
    });

    findRecord.forEach(function (item) {
      if (
        item.estTypeId.equals(estimationCalcAttr.estTypeId) &&
        item.calcAttributeName == estimationCalcAttr.calcAttributeName
      ) {
        throw new Error(
          constant.estimationCalcAttrMessage.ESTIMATIONCALCATTR_DUPLICATE
        );
      }
    });

    let result = await estimationCalcAttr.save();
    return formatMongoData(result);
  } catch (err) {
    console.log(
      "something went wrong: service > estimationCalcAttrService ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getAllEstimationCalcAttr = async ({ skip = 0, limit = 10 }) => {
  try {
    return EstimationCalcAttr.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
  } catch (err) {
    console.log(
      "something went wrong: service > estimationCalcAttrService ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getEstimationCalcAttrById = async ({ id }) => {
  try {
    if (!Types.ObjectId(id)) {
      throw new Error(estimationCalcAttrMessage.INVALID_ID);
    }
    let estimationCalcAttr = await findById(id)
      .populate("estTypeId")
      .populate({
        path: "estimates",
        populate: { path: "estTypeId" },
      });
    if (!estimationCalcAttr) {
      throw new Error(estimationCalcAttrMessage.ESTIMATIONCALCATTR_NOT_FOUND);
    }
    return formatMongoData(estimationCalcAttr);
  } catch (err) {
    console.log(
      "something went wrong: service > estimationCalcAttrservice ",
      err
    );
    throw new Error(err);
  }
};

module.exports.estimationCalcAttrUpdate = async ({ id, updateInfo }) => {
  try {
    let estimationCalcAttr = await findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!estimationCalcAttr) {
      throw new Error(estimationCalcAttrMessage.ESTIMATIONCALCATTR_NOT_FOUND);
    }
    return formatMongoData(estimationCalcAttr);
  } catch (err) {
    console.log(
      "something went wrong: service > estimationCalcAttrservice ",
      err
    );
    throw new Error(err);
  }
};

module.exports.estimationCalcAttrDelete = async ({ id }) => {
  try {
    let estimationCalcAttr = await updateOne({ _id: id }, { isDeleted: true });
    if (!estimationCalcAttr) {
      throw new Error(estimationCalcAttrMessage.ESTIMATIONCALCATTR_NOT_FOUND);
    }
    return formatMongoData(estimationCalcAttr);
  } catch (err) {
    console.log(
      "something went wrong: service > estimationCalcAttrService ",
      err
    );
    throw new Error(err);
  }
};
