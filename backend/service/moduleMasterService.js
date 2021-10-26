const constant = require("../constant")
const ModuleMaster = require("../database/models/moduleMasterModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")

module.exports.createModuleMaster = async (serviceData) => {
    try {
        let module = new ModuleMaster({ ...serviceData })
        console.log(module);
        let exits = await ModuleMaster.find({ moduleName: module.moduleName });
        if (exits.length == 0) {
            let result = await module.save();
            return formatMongoData(result)
        }
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

