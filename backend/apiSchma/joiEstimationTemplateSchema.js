const Joi = require("joi");
module.exports.createEstimationTemplateSchema = Joi.object({

    estType: Joi.string().required(),
    description: Joi.string().required(),
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

// module.exports.estimationTemplateUpdateSchema = Joi.object({
//     estType: Joi.string(),
//     description: Joi.string()
// })


