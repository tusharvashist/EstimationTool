
const Joi = require("joi");
module.exports.signup = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required(),
    roleId : Joi.string().required(),
    firstname : Joi.string().required(),
    lastname : Joi.string()
})

module.exports.login = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required()
})