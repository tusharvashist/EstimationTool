const Joi = require("joi");
module.exports.createResourcePlan = Joi.object({
  estResourceCountID: Joi.string().required(),
  resourceRoleID: Joi.string().required(),
  cost: Joi.number().required(),
  currency: Joi.string().required(),
  price: Joi.number(),
  allocationPercent: Joi.number().required(),

  defaultAdjusted: Joi.boolean()
})



