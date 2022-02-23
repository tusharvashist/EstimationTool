const Joi = require("joi");

module.exports.sendMail = Joi.object({
    to:Joi.string(),
    subject:Joi.string(), 
    bodyData:{
        clientName :Joi.string(), 
        projectName:Joi.string(), 
        estimationName:Joi.string(),
        estimationLink:Joi.string(),
        assignedRole:Joi.string(),
        mialType:Joi.string(),
    }, 
    isFileAttached :Joi.bool(), 
})