const Joi = require("joi");
module.exports.createProjectSchema = Joi.object({
    projectName:Joi.string().required(),
    projectDescription:Joi.string().required()
})
module.exports.getallProject = Joi.object({ 
    skip:Joi.string(),
    limit:Joi.string()
})
module.exports.projectUpdateSchema = Joi.object({ 
    projectName:Joi.string(),
    projectDescription:Joi.string()
})