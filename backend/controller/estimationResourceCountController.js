const estimationResourceCountService = require("../service/estimationResourceCountService");
const constant = require("../constant");

module.exports.generateResourceCount = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceGetByID =
      await estimationResourceCountService.generateResourceCount(req.query);
    responce.status = 200;
    responce.message = constant.ResourceCountMessage.ResourceCount_CREATED;
    responce.body = responceGetByID;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};

module.exports.getResourceCount = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceGetByID =
      await estimationResourceCountService.getResourceCount(req.query);
    responce.status = 200;
    responce.message = constant.ResourceCountMessage.ResourceCount_FETCH;
    responce.body = responceGetByID;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};

module.exports.updateTechnologyResourceCount = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceGetByID =
      await estimationResourceCountService.updateTechnologyResourceCount({
        updatedInfo: req.body,
      });
    responce.status = 200;
    responce.message = constant.ResourceCountMessage.ResourceCountTech_UPDATE;
    responce.body = responceGetByID;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};

module.exports.updateResourcePlanning = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceGetByID =
      await estimationResourceCountService.updateResourcePlanning({
        updatedInfo: req.body,
      });
    responce.status = 200;
    responce.message = constant.ResourceCountMessage.ResourceRoleCount_UPDATE;
    responce.body = responceGetByID;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};

module.exports.GetResourceCountRoleData = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responseRole =
      await estimationResourceCountService.GetResourceCountRoleData(req.query);
    responce.status = 200;
    responce.message = constant.ResourceCountMessage.ResourceCount_FETCH;
    responce.body = responseRole;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};
