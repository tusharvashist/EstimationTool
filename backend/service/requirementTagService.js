const constant = require("../constant")
const RequirementTag = require("../database/models/requirementTag")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")

const RequirementRepository = require("../reposetory/requirementRepository")

module.exports.getAllRequirementTag = async ({ skip = 0, limit = 10 }) => {
    try {
        let requirementTag = await RequirementTag.find().sort({ updatedAt: -1 }).skip(parseInt(skip)).limit(parseInt(limit));

        return formatMongoData(requirementTag)
    } catch (err) {
        console.log("something went wrong: service > requirementTag ", err);
        throw new Error(err)
    }
}



module.exports.getTagsType = async () => {
    try {
      let response = { ...constant.requirementResponse };
      response.requirementType = await RequirementRepository.getTypes();
      response.requirementTag = await RequirementRepository.getTags();
      return formatMongoData(response);
  } catch (err) {
    throw new Error(err);
  }
}