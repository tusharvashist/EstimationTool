const Joi = require("joi");
module.exports.createEstimationSchema = Joi.object({
    estimationName: Joi.string().required(),
    estimationDescription: Joi.string().required(),
    estimationType: Joi.string().required(),
    clientName: Joi.string().required(),
    projectName: Joi.string().required(),
    lastupdate: Joi.date().required()
})
module.exports.getallEstimationSchema = Joi.object({
    skip: Joi.string(),
    limit: Joi.string()
})
module.exports.UpdateEstimationHeaderSchema = Joi.object({
    estheaderParentid: Joi.string().required(),
    estVersionno: Joi.number().required(),
    projectId: Joi.string().required(),
    estName: Joi.string().required(),
    estTypeId: Joi.string().required(),
    estDescription: Joi.string().required(),
    effortUnit: Joi.string().required(),
    manCount: Joi.number(),
    contigency: Joi.string(),
    totalCost: Joi.number(),
    estCalcColumns: Joi.string(),
    estColumns: Joi.string(),
    isDeleted: Joi.boolean(),
    createdBy: Joi.string(),
    updatedBy: Joi.string(),
    estStep : Joi.string()
})



module.exports.createEstimationHeaderSchema = Joi.object({
    estheaderParentid: Joi.string().required(),
    estVersionno: Joi.number().required(),
    projectId: Joi.string().required(),
    estName: Joi.string().required(),
    estTypeId: Joi.string().required(),
    estDescription: Joi.string(),
    effortUnit: Joi.string(),
    manCount: Joi.number(),
    contigency: Joi.string(),
    totalCost: Joi.number(),
    estCalcColumns: Joi.string(),
    estColumns: Joi.string(),
    isDeleted: Joi.boolean(),
    createdBy: Joi.string(),
    updatedBy: Joi.string(),
    estStep : Joi.string()
})