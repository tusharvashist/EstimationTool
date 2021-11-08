const Joi = require("joi");
module.exports.createEstimationHeaderAtrributeSchema = Joi.object({
    estHeaderId: Joi.string().required(),
    estAttributeId: Joi.string().required()
})
module.exports.getEstimationHeaderAtrributeById = Joi.object({
    id: Joi.string().required()
})
module.exports.getallEstimationHeaderAtrribute = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
module.exports.estimationHeaderAtrributeUpdateSchema = Joi.object({
    estHeaderId: Joi.string().required(),
    estAttributeId: Joi.string().required()
})


//==========================================================
