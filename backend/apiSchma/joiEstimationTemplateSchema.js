const Joi = require("joi");
module.exports.createEstimationTemplateSchema = Joi.object({
    estimationName: Joi.string().required(),
    estimationDescription: Joi.string().required(),
    estimationType: Joi.string().required(),
    clientName: Joi.string().required(),
    projectName: Joi.string().required(),
    lastupdate: Joi.date().required()
})
module.exports.getallEstimationTemplate = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
