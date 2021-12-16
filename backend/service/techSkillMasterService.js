const constant = require("../constant")
const TechSkill = require("../database/models/techSkillMaster")
const { formatMongoData } = require("../helper/dbhelper")
//const mongoose = require("mongoose")

//const RequirementRepository = require("../reposetory/requirementRepository")

module.exports.getAllTechSkill = async ({ skip = 0, limit = 10 }) => {
    try {
        let techSkill = await TechSkill.find().sort({ updatedAt: -1 }).skip(parseInt(skip)).limit(parseInt(limit));

        return formatMongoData(techSkill)
    } catch (err) {
        console.log("something went wrong: service > techSkill ", err);
        throw new Error(err)
    }
}

module.exports.createTechSkill = async (serviceData) => {
    try {
        let techSkill = new TechSkill({ ...serviceData })
        let result = await techSkill.save();
        return formatMongoData(result)
    } catch (err) {
        console.log("something went wrong: service > techSkill create service ", err);
        throw new Error(err)
    }
}
