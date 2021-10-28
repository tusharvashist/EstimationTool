const Joi = require("joi");
module.exports.createEstimationCalcAttrSchema = Joi.object({
    estTypeId: Joi.string().required(),
    calcAttribute: Joi.string().required(),
    calcAttributeName: Joi.string().required(),
    isFormula: Joi.boolean().required(),
    formula: Joi.string().required(),
    operator: Joi.string().required(),
    unit: Joi.number().required(),
    description: Joi.string().required()


})
module.exports.getallEstimationCalcAttr = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
module.exports.estimationCalcAttrUpdateSchema = Joi.object({
    estTypeId: Joi.string().required(),
    calcAttribute: Joi.string().required(),
    calcAttributeName: Joi.string().required(),
    isFormula: Joi.boolean().required(),
    formula: Joi.string().required(),
    operator: Joi.string().required(),
    unit: Joi.number().required(),
    description: Joi.string().required()
})