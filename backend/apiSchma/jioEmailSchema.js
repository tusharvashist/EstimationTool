const Joi = require("joi");

module.exports.sendMail = Joi.object({
    to: Joi.string(),
    subject: Joi.string(),
    bodyData: {
        senderName: Joi.string(),
        ownerName: Joi.string(),
        clientName: Joi.string(),
        projectName: Joi.string(),
        estimationName: Joi.string(),
        estimationLink: Joi.string(),
        assignedRole: Joi.string(),
        mailType: Joi.string(),
    },
    isFileAttached: Joi.bool(),
})