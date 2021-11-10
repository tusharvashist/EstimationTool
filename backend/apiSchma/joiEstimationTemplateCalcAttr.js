const Joi = require("joi");
module.exports.createEstimationTemplateCalcAttrSchema = Joi.object({
    estCalcId: Joi.string().required(),
    estTypeId: Joi.string().required()
})
module.exports.getallEstimationTemplateCalcAttr = Joi.object({
    esttype: Joi.string(),
    estheaderid: Joi.string()
})
module.exports.sstimationTemplateCalcAttrUpdateSchema = Joi.object({
    estCalcId: Joi.string().required(),
    estTypeId: Joi.string().required()
})