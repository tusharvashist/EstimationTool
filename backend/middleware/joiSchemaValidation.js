const Joi = require("joi");
const JoiSchema = require("../apiSchma/joiEstimationSchema");
const constant = require("../constant");

const validateObjectSchema = (data, schema) => {
  const result = schema.validate(data);
  if (result.error) {
    return result.error.details.map((value) => {
      return {
        error: value.message,
        path: value.path,
      };
    });
  }
  return null;
};

module.exports.validateBody = (schema) => {
  return (req, res, next) => {
    const isError = validateObjectSchema(req.body, schema);
    let responce = { ...constant.defaultResponce };
    if (isError) {
      responce.body = isError;
      responce.message = constant.requestValidationMessage.BAD_REQUEST;
      return res.status(responce.status).send(responce);
    }
    return next();
  };
};

module.exports.validateParams = (schema) => {
  return (req, res, next) => {
    const isError = validateObjectSchema(req.params, schema);
    let responce = { ...constant.defaultResponce };
    if (isError) {
      responce.body = isError;
      responce.message = constant.requestValidationMessage.BAD_REQUEST;
      return res.status(responce.status).send(responce);
    }
    return next();
  };
};

module.exports.validateQueryParams = (schema) => {
  return (req, res, next) => {
    const isError = validateObjectSchema(req.query, schema);
    let responce = { ...constant.defaultResponce };
    if (isError) {
      responce.body = isError;
      responce.message = constant.requestValidationMessage.BAD_REQUEST;
      return res.status(responce.status).send(responce);
    }
    return next();
  };
};

module.exports.validateHeadresAuthorization = () => {
  return (req, res, next) => {
    const isError = req.headers.authorization;
    if (!isError) {
      return res
        .status(400)
        .send(constant.requestValidationMessage.AUTHORIZATION_MISSING);
    }
    return next();
  };
};
