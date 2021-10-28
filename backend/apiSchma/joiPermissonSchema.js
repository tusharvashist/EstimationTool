const Joi = require("joi");
module.exports.createPermissionSchema = Joi.object({
    typeId: Joi.string().required(),
    typeName: Joi.string().required(),
    tokenID: Joi.string()
})

module.exports.getAllPermission = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})

module.exports.getAllUserPermission = Joi.object({
    roletype : Joi.string()
})