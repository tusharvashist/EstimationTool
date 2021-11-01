
const Joi = require("joi");
module.exports.signup = Joi.object({
    email:Joi.string().required(),
    pass: Joi.string().required(),
    first_name: Joi.string().required(),
     last_name: Joi.string(),
})

module.exports.login = Joi.object({
    email:Joi.string().required(),
    pass:Joi.string().required()
})