const Joi = require("joi");
module.exports.createEstimationPublishSchema = Joi.object({
  estHeaderId: Joi.string().required(),
  publishDate: Joi.date().required(),
  version: Joi.string().required(),
});
