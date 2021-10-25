const constant = require("../constant")
const PageMaster = require("../database/models/pageMasterModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")

module.exports.createPageMaster = async (serviceData) => {
    try {
        let page = new PageMaster({ ...serviceData })
        let result = await page.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > Page Master Servive ", err);
        throw new Error(err)
    }
}


module.exports.getAllPageMaster = async ({ skip = 0, limit = 10 }) => {
    try {
        let page = await PageMaster.find({}).skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(page)
    } catch (err) {
        console.log("something went wrong: service > Get All Page Master Servive ", err);
        throw new Error(err)
    }
}

