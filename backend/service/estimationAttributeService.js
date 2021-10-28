const constant = require("../constant")
const EstimationAttribute = require("../database/models/estimationAttributesModel")
const EstimationTemplateAttribute = require("../database/models/estimationTemplateAttrModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")

module.exports.createEstimationAttribute = async (serviceData) => {
    try {
        let page = new EstimationAttribute({ ...serviceData })

        let result = await page.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > Estimation Attribute Service ", err);
        throw new Error(err)
    }
}


module.exports.getAllEstimationAttributes = async ({ estTypeId }) => {
    try {
        let estAtt = await EstimationAttribute.find({});
        let estSelAtt=await EstimationTemplateAttribute.find({});
        return formatMongoData(estAtt)
    } catch (err) {
        console.log("something went wrong: service > Get All Estimation Attribute Service ", err);
        throw new Error(err)
    }
}

