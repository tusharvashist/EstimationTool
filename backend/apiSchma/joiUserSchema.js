
const Joi = require("joi");
module.exports.signup = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required(),
    roleId : Joi.string().required()
})

module.exports.login = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required()
})