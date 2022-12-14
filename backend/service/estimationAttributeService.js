const constant = require("../constant");
const EstimationAttribute = require("../database/models/estimationAttributesModel");
const EstimationTemplateAttribute = require("../database/models/estimationTemplateAttrModel");
const EstimationHeaderAttributes = require("../database/models/estimationHeaderAtrributeModel");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

module.exports.createEstimationAttribute = async (serviceData) => {
  try {
    let attribute = new EstimationAttribute({ ...serviceData });
    const exists = await EstimationAttribute.find({
      attributeName: attribute.attributeName,
    });
    if (exists.length != 0) {
      throw new Error(constant.EstimationAttributeMessage.ATTRIBUTE_DUPLICATE);
    }
    let result = await attribute.save();
    return formatMongoData(result);
  } catch (err) {
    console.log(
      "something went wrong: service > Estimation Attribute Service ",
      err
    );
    throw new Error(err);
  }
};

module.exports.createEstimationTempplateAttribute = async (serviceData) => {
  try {
    let page = new EstimationTemplateAttribute({ ...serviceData });

    let result = await page.save();
    return formatMongoData(result);
  } catch (err) {
    console.log(
      "something went wrong: service > Estimation Template Attribute Service ",
      err
    );
    throw new Error(err);
  }
};

//To do
module.exports.getAllEstimationAttributes = async ({
  esttype,
  estheaderid,
}) => {
  try {
    let estAtt = await EstimationAttribute.aggregate()
      .addFields({ selected: false })
      .sort({ attributeName: "asc" });

    if (estheaderid) {
      let estSelAtt = await EstimationHeaderAttributes.find({
        estHeaderId: estheaderid,
      });

      estSelAtt.forEach((estSelAttElement) => {
        let filterdata = estAtt.filter(
          (x) => String(x._id) == String(estSelAttElement.estAttributeId)
        );
        if (filterdata.length) filterdata[0].selected = true;
      });
    }

    if (esttype) {
      let estSelAtt = await EstimationTemplateAttribute.find({
        estTypeId: esttype,
      });

      estSelAtt.forEach((estSelAttElement) => {
        let filterdata = estAtt.filter(
          (x) => String(x._id) == String(estSelAttElement.estAttrId)
        );
        if (filterdata.length) filterdata[0].selected = true;
      });
    }
    return estAtt;
  } catch (err) {
    console.log(
      "something went wrong: service > Get All Estimation Attribute Service ",
      err
    );
    throw new Error(err);
  }
};
