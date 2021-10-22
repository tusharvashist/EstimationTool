const Joi = require("joi");
module.exports.createProjectSchema = Joi.object({
    projectName: Joi.string().required(),
    projectDescription: Joi.string().allow(""),
    client: Joi.string().required(),
    isDeleted: Joi.boolean().required(),
    domain: Joi.string().required(),
})
module.exports.getallProject = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
module.exports.projectUpdateSchema = Joi.object({
    projectName: Joi.string(),
    projectDescription: Joi.string().allow(""),
    domain: Joi.string().required()
})