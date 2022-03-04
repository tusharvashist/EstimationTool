const Joi = require("joi");

module.exports.getEstimationClonePayloadValidation = Joi.object({
    id: Joi.string().required(),
    estName: Joi.string().required()
})
