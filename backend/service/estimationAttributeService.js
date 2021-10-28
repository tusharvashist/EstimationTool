const constant = require("../constant")
const EstimationAttribute = require("../database/models/estimationAttributesModel")
const EstimationTemplateAttribute = require("../database/models/estimationTemplateAttrModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")
const ObjectID = require('mongodb').ObjectId;

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

module.exports.createEstimationTempplateAttribute = async (serviceData) => {
    try {
        let page = new EstimationTemplateAttribute({ ...serviceData })

        let result = await page.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > Estimation Template Attribute Service ", err);
        throw new Error(err)
    }
}

module.exports.getAllEstimationAttributes = async ({ esttype }) => {
    try {
        let estAtt = await EstimationAttribute.aggregate().addFields({ selected: true });
        var est = ObjectID(esttype);      
        console.log(est); 
        let estSelAtt = await EstimationTemplateAttribute.find({estTypeId : est});
        console.log(estSelAtt);
        return (estAtt);
    } catch (err) {
        console.log("something went wrong: service > Get All Estimation Attribute Service ", err);
        throw new Error(err)
    }
}

