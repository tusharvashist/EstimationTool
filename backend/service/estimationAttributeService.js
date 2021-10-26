const constant = require("../constant")
const EstimationAttribute = require("../database/models/estimationAttributesModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")

module.exports.createEstimationAttribute = async (serviceData) => {
    try {
        let page = new EstimationAttribute({ ...serviceData })
        let result = await page.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > Estimation Attribute Servive ", err);
        throw new Error(err)
    }
}


module.exports.getAllEstimationAttributes = async ({ esttypeId }) => {
    try {
        let page = await EstimationAttribute.find({});
        
        return formatMongoData(page)
    } catch (err) {
        console.log("something went wrong: service > Get All Estimation Attribute Servive ", err);
        throw new Error(err)
    }
}

