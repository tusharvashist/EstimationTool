const constant = require("../constant");
const EstimationTemplateCalcAttr = require("../database/models/estimationTemplateCalcAttrModel");
const ObjectId = require("mongodb").ObjectId;
const EstimationCalcAttr = require("../database/models/estimationCalcAttrModel");
//const EstimationHeaderAttributeCalc = require("../database/models/estimationHeaderAtrributeCalcModel")
// estimationHeaderAtrributeCalc- header plus more
// estimationHeaderAtrribute
// EstimationCalcAttr

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
      // //TODO formulaTags and tag is to be populated in estAttCalc in find

      let estSelAtt = await EstimationHeaderTemplateCalcAttr.find({
        estHeaderId: ObjectId(estheaderid),
      })
        .populate("tag")
        .populate({
          path: "formulaTags",
        });

      console.log(estSelAtt);

      var index = 0;
      estAttCalc.forEach((element) => {
        estSelAtt.forEach((estSelAttElement) => {
          if (String(estSelAttElement.estCalcId) == String(element._id)) {
            element.selected = true;
            element.isFormula = estSelAttElement.isFormula;
            element.formula = estSelAttElement.formula;
            element.tag = estSelAttElement.tag;
            element.calcType = estSelAttElement.calcType;
            element.formulaTags = estSelAttElement.formulaTags;
            element.operator = estSelAttElement.operator;
            element.unit = estSelAttElement.unit;
            element.description = estSelAttElement.description;
            element.value = estSelAttElement.value;
            element.calcAttributeName = estSelAttElement.calcAttributeName;
          }
        });
      });
    }

    if (esttype) {
      //TODO formulaTags and tag is to be populated in estAttCalc in find

      let estSelAtt = await EstimationTemplateCalcAttr.find({
        estTypeId: esttype,
      })
        .populate("tag")
        .populate({
          path: "formulaTags",
        });

      var index = 0;
      estAttCalc.forEach((element) => {
        estSelAtt.forEach((estSelAttElement) => {
          if (String(estSelAttElement.estCalcId) == String(element._id)) {
            element.selected = true;
          }
        });
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