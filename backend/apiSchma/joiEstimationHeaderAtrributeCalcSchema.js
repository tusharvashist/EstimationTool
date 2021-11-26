const Joi = require("joi");
module.exports.estimationHeaderAtrributeCalcSchema = Joi.object({
    estHeaderId: Joi.string().required(),
    calcAttribute: Joi.string().required(),
    calcAttributeName: Joi.string().required(),
    isFormula: Joi.boolean().required(),
    formula: Joi.string().required(),
    operator: Joi.string().required(),
    unit: Joi.number().required(),
    description: Joi.string(),
    tag: Joi.string().required,
    formulaTags: Joi.array()
})
module.exports.getEstimationHeaderAtrributeCalcById = Joi.object({
    id: Joi.string().required()
})
module.exports.getallEstimationHeaderAtrributeCalc = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
module.exports.estimationHeaderAtrributeCalcUpdateSchema = Joi.object({
    estHeaderId: Joi.string().required(),
    calcAttribute: Joi.string().required(),
    calcAttributeName: Joi.string().required(),
    isFormula: Joi.boolean().required(),
    formula: Joi.string().required(),
    operator: Joi.string().required(),
    unit: Joi.number().required(),
    description: Joi.string(),
    tag: Joi.string().required,
    formulaTags: Joi.array()
})