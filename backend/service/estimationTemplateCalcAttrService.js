const constant = require("../constant");
const EstimationTemplateCalcAttr = require("../database/models/estimationTemplateCalcAttrModel");
const ObjectId = require("mongodb").ObjectId;
const EstimationCalcAttr = require("../database/models/estimationCalcAttrModel");
const EstimationHeaderTemplateCalcAttr = require("../database/models/estimationHeaderAtrributeCalcModel");
const Client = require("../database/models/clientModel");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");

module.exports.createEstimationTemplateCalcAttr = async (serviceData) => {
  try {
    let estimationTemplateCalcAttr = new EstimationTemplateCalcAttr({
      ...serviceData,
    });
    let result = await estimationTemplateCalcAttr.save();

    return formatMongoData(result);
  } catch (err) {
    console.log(
      "something went wrong: service > estimationTemplateCalcAttrService ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getAllEstimationTemplateCalcAttr = async ({
  esttype,
  estheaderid,
}) => {
  try {
    let estAttCalc = await EstimationCalcAttr.aggregate([
      {
        $match: {
          estTypeId: ObjectId(esttype),
        },
      },
      {
        $lookup: {
          from: "requirementtags",
          localField: "tag",
          foreignField: "_id",
          as: "tag",
        },
      },
      {
        $unwind: {
          path: "$tag",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "requirementtags",
          localField: "formulaTags",
          foreignField: "_id",
          as: "formulaTags",
        },
      },
    ]).addFields({ selected: false, value: "" });
    if (estheaderid) {
      let estSelAtt = await EstimationHeaderTemplateCalcAttr.find({
        estHeaderId: ObjectId(estheaderid),
      })
        .populate("tag")
        .populate({
          path: "formulaTags",
        });

      estSelAtt.forEach((estSelAttElement) => {
        let element = estAttCalc.filter(
          (x) => String(estSelAttElement.estCalcId) == String(x._id)
        );
        if (element.length > 0) {
          element[0].selected = true;
          element[0].isFormula = estSelAttElement.isFormula;
          element[0].formula = estSelAttElement.formula;
          element[0].tag = estSelAttElement.tag;
          element[0].calcType = estSelAttElement.calcType;
          element[0].formulaTags = estSelAttElement.formulaTags;
          element[0].operator = estSelAttElement.operator;
          element[0].unit = estSelAttElement.unit;
          element[0].description = estSelAttElement.description;
          element[0].value = estSelAttElement.value;
          element[0].calcAttributeName = estSelAttElement.calcAttributeName;
        }
      });
    }

    if (esttype) {
      let estSelAtt = await EstimationTemplateCalcAttr.find({
        estTypeId: esttype,
      })
        .populate("tag")
        .populate({
          path: "formulaTags",
        });

      estSelAtt.forEach((estSelAttElement) => {
        let element = estAttCalc.filter(
          (x) => String(estSelAttElement.estCalcId) == String(x._id)
        );
        if (element.length > 0) {
          element[0].selected = true;
        }
      });

      return estAttCalc;
    }
  } catch (err) {
    console.log(
      "something went wrong: service > estimationTemplateCalcAttrService ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getEstimationTemplateCalcAttrById = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.estimationTemplateCalcAttrMessage.INVALID_ID);
    }
    let estimationTemplateCalcAttr = await EstimationTemplateCalcAttr.findById(
      id
    )
      .populate("estTypeId")
      .populate({
        path: "estimates",
        populate: { path: "estTypeId" },
      });
    if (!estimationTemplateCalcAttr) {
      throw new Error(
        constant.estimationTemplateCalcAttrMessage.ESTIMATIONTEMPLATECALCATTR_NOT_FOUND
      );
    }
    return formatMongoData(estimationTemplateCalcAttr);
  } catch (err) {
    console.log(
      "something went wrong: service > estimationTemplateCalcAttrservice ",
      err
    );
    throw new Error(err);
  }
};

module.exports.estimationTemplateCalcAttrUpdate = async ({
  id,
  updateInfo,
}) => {
  try {
    let estimationTemplateCalcAttr =
      await EstimationTemplateCalcAttr.findOneAndUpdate(
        { _id: id },
        updateInfo,
        { new: true }
      );
    if (!estimationTemplateCalcAttr) {
      throw new Error(
        constant.estimationTemplateCalcAttrMessage.ESTIMATIONTEMPLATECALCATTR_NOT_FOUND
      );
    }
    return formatMongoData(estimationTemplateCalcAttr);
  } catch (err) {
    console.log(
      "something went wrong: service > estimationTemplateCalcAttrservice ",
      err
    );
    throw new Error(err);
  }
};

module.exports.estimationTemplateCalcAttrDelete = async ({ id }) => {
  try {
    let estimationTemplateCalcAttr = await EstimationTemplateCalcAttr.updateOne(
      { _id: id },
      { isDeleted: true }
    );
    if (!estimationTemplateCalcAttr) {
      throw new Error(
        constant.estimationTemplateCalcAttrMessage.ESTIMATIONTEMPLATECALCATTR_NOT_FOUND
      );
    }
    return formatMongoData(estimationTemplateCalcAttr);
  } catch (err) {
    console.log(
      "something went wrong: service > estimationTemplateCalcAttrService ",
      err
    );
    throw new Error(err);
  }
};
