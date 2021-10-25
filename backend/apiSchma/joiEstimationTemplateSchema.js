const Joi = require("joi");
module.exports.createEstimationTemplateSchema = Joi.object({
    estType: Joi.string().required(),
    description: Joi.string().required()
})
module.exports.getallEstimationTemplate = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
// module.exports.estimationTemplateUpdateSchema = Joi.object({
//     estType: Joi.string(),
//     description: Joi.string()
// })

