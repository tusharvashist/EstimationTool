const constant = require("../constant")
const ModuleTokenMaster = require("../database/models/moduleTokenModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")

module.exports.createModuleToken = async (serviceData) => {
    try {
        let page = new ModuleTokenMaster({ ...serviceData })
        let result = await page.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > Module Token Service ", err);
        throw new Error(err)
    }
}


module.exports.getAllModuleTokens = async ({ skip = 0, limit = 10 }) => {
    try {
        let page = await ModuleTokenMaster.find({}).skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(page)
    } catch (err) {
        console.log("something went wrong: service > Get All Module Token Service ", err);
        throw new Error(err)
    }
}

