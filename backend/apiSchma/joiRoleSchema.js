const Joi = require("joi");
module.exports.createRoleSchema = Joi.object({
    roleName: Joi.string().required(),
    roleDescription: Joi.string().required()
})
module.exports.getallRole = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
module.exports.roleUpdateSchema = Joi.object({
    roleName: Joi.string(),
    roleDescription: Joi.string()
})