const Joi = require("joi");
module.exports.createEstimationAttributeSchema = Joi.object({
    attributeCode: Joi.string().required(),
    attributeName: Joi.string().required(),
    description: Joi.string()
})
module.exports.getAllEstimationAttribute = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})