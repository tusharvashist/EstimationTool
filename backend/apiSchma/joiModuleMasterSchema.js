const Joi = require("joi");
module.exports.moduleMasterCreateSchema = Joi.object({
    moduleName: Joi.string().required(),
    moduleDecription: Joi.string()
})
module.exports.getallModuleMaster = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
