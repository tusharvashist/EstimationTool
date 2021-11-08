const Joi = require("joi");
module.exports.createEstimationAttributeSchema = Joi.object({
    attributeCode: Joi.string().required(),
    attributeName: Joi.string().required(),
    description: Joi.string()
})
module.exports.getAllEstimationAttribute = Joi.object({
    esttype : Joi.string(),
    estheaderid : Joi.string()
})

module.exports.createEstimationTemplateAttSchema = Joi.object({
    estAttrId: Joi.string().required(),
    estTypeId: Joi.string().required()
})