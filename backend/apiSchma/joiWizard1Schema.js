const Joi = require("joi");
module.exports.createWizard1Schema = Joi.object({
    estHeaderId: Joi.string().required(),
    estAttributeId: Joi.string().required()
})
module.exports.getWizard1ById = Joi.object({
    id: Joi.string().required()
})
module.exports.getallWizard1 = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
module.exports.wizard1UpdateSchema = Joi.object({
    estHeaderId: Joi.string().required(),
    estAttributeId: Joi.string().required()
})