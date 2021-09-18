
const Joi = require("joi");
module.exports.signup = Joi.object({
    email:Joi.string().required(),
    pass:Joi.string().required()
})

module.exports.login = Joi.object({
    email:Joi.string().required(),
    pass:Joi.string().required()
})