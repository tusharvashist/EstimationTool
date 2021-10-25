const Joi = require("joi");
module.exports.pageMasterCreateSchema = Joi.object({
    pageName: Joi.string().required(),
    pageURL: Joi.string()
})
module.exports.getallPagemaster = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
module.exports.pageMasterUpdateSchema = Joi.object({
    roleName: Joi.string().required(),
    roleDescription: Joi.string()
})