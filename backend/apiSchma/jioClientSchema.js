const Joi = require("joi");
module.exports.createClientSchema = Joi.object({
    clientName:Joi.string().required(),
    website:Joi.string().required(),
    description:Joi.string().required()
})
module.exports.getallClients = Joi.object({ 
    skip:Joi.string(),
    limit:Joi.string()
})
module.exports.clientUpdateSchema = Joi.object({ 
    clientName:Joi.string(),
    website:Joi.string(),
    description:Joi.string()
})