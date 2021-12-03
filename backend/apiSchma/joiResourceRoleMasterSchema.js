const Joi = require("joi");
module.exports.createResourceRoleMasterSchema = Joi.object({
    resourceRole: Joi.string().required(),
    cost: Joi.number().required(),
    price: Joi.number().required(),
    techSkill: Joi.string().required(),
    location: Joi.string().required(),
    isDeleted: Joi.boolean(),
    defaultAdjusted: Joi.boolean().required()
})
module.exports.getResourceRoleMasterSchema = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
