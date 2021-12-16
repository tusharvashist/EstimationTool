const Joi = require("joi");


module.exports.getallTechSkill = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
module.exports.createTechSkill = Joi.object({
    skill: Joi.string().required(),
})
