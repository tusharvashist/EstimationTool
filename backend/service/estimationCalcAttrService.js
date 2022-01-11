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
    //const findRecord1 = await EstimationCalcAttr.find({ estTypeId: estimationCalcAttr.estTypeId })
    findRecord.forEach(function (item) {
      //console.log(item.estTypeId, item.calcAttributeName + "seiurygfwouergfoquwevf");
      // console.log("are equal", item.calcAttributeName == estimationCalcAttr.calcAttributeName)
      // console.log(estimationCalcAttr.estTypeId, estimationCalcAttr.calcAttributeName,);

      if (
        item.estTypeId.equals(estimationCalcAttr.estTypeId) &&
        item.calcAttributeName == estimationCalcAttr.calcAttributeName
      ) {
        throw new Error(
          constant.estimationCalcAttrMessage.ESTIMATIONCALCATTR_DUPLICATE
        );
      }
    });

    // //  console.log(findRecord1 + ">>>>>>>")
    // let arr = [...findRecord];

    // //console.log(estimationCalcAttr + "the service data/.....")
    // debugger
    // console.log(arr + "the service data/.....")

    // if (findRecord.estTypeId == estimationCalcAttr.estTypeId && findRecord.calcAttributeName == estimationCalcAttr.estTypeId.calcAttributeName) {
    //     console.log("duplicate found in " + i)
    // }

    // if (findRecord.length != 0) {

    //     if ((findRecord1.calcAttributeName == findRecord.calcAttributeName && (findRecord[0].estTypeId == findRecord1.estTypeId))) {
    //         // if (findRecord1.estTypeId == findRecord.estTypeId) {
    //         throw new Error(constant.estimationCalcAttrMessage.ESTIMATIONCALCATTR_DUPLICATE);
    //         // }

    //     }
    // }

    //----------

    // if (findRecord.length != 0) {
    //     throw new Error(constant.estimationCalcAttrMessage.ESTIMATIONCALCATTR_DUPLICATE);
    // }

    let result = await estimationCalcAttr.save();

    // const client = await Client.findById({ _id: project.client })
    // client.projects.push(project);
    // await client.save();

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
    let estimationCalcAttr = await EstimationCalcAttr.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return estimationCalcAttr;
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
