const Joi = require("joi");


module.exports.getallRequirementTag = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
