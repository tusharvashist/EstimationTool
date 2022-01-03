const Joi = require("joi");
module.exports.getAllExportData = Joi.array()
  .items(
    Joi.object({
      key: Joi.string().required(),
      value: Joi.boolean().required(),
    })
  )
  .has(
    Joi.object().keys({
      key: Joi.string().required(),
      value: Joi.boolean().invalid(false).required(),
    })
  );
