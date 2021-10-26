const constant = require("../constant")
const ModuleMaster = require("../database/models/moduleMasterModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")

module.exports.createModuleMaster = async (serviceData) => {
    try {
        let page = new ModuleMaster({ ...serviceData })
        let result = await page.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > Module Master Service ", err);
        throw new Error(err)
    }
}


module.exports.getAllModuleMaster = async ({ skip = 0, limit = 10 }) => {
    try {
        let page = await ModuleMaster.find({}).skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(page)
    } catch (err) {
        console.log("something went wrong: service > Get All Module Master Service ", err);
        throw new Error(err)
    }
}

