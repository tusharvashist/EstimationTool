const Joi = require("joi");
module.exports.moduleTokenCreateSchema = Joi.object({
    moduleId: Joi.string().required(),
    token: Joi.string()
})
module.exports.getallModuleToken = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
