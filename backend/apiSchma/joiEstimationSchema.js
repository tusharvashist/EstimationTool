const Joi = require("joi");
module.exports.createEstimationSchema = Joi.object({
    estimationName:Joi.string().required(),
    estimationDescription:Joi.string().required(),
    estimationType:Joi.string().required(),
    clientName:Joi.string().required(),
    projectName:Joi.string().required(),
    lastupdate:Joi.date().required()
})
module.exports.getallEstimationSchema = Joi.object({ 
    skip:Joi.string(),
    limit:Joi.string()
})
module.exports.estimationUpdateSchema = Joi.object({ 
    estimationName:Joi.string(),
    estimationDescription:Joi.string(),
    estimationType:Joi.string(),
    clientName:Joi.string(),
    projectName:Joi.string(),
    lastupdate:Joi.date()
})