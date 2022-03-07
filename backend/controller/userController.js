const signupSer = require("../service/userService");
const constant = require("../constant");

module.exports.signup = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceFromUserService = await signupSer.signup(req.body);
    responce.status = 200;
    responce.message = constant.userMessage.SIGNUP_SUCCESS;
    responce.body = responceFromUserService;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};

module.exports.login = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceFromUserService = await signupSer.login(req);
    responce.status = 200;
    responce.message = constant.userMessage.LOGIN_SUCCESS;
    responce.body = responceFromUserService.user;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};

module.exports.getAllUserByName = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceFromUserService = await signupSer.getAllUserByName(req.query);
    responce.status = 200;
    responce.message = constant.userMessage.FETCH_USER;
    responce.body = responceFromUserService;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};

module.exports.validateshareestlink = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceFromUserService = await signupSer.validateshareestlink(req);
    responce.status = 200;
    responce.message = constant.userMessage.FETCH_USER;
    responce.body = responceFromUserService;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};

module.exports.updateuserrole = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceFromUserService = await signupSer.updateuserrole(req);
    responce.status = 200;
    responce.message = constant.roleMessage.ROLE_UPDATE;
    responce.body = responceFromUserService.user;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};

module.exports.fetchalluserswithrole = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceFromUserService = await signupSer.fetchalluserswithrole();
    responce.status = 200;
    responce.message = constant.userMessage.FETCH_USER;
    responce.body = responceFromUserService;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};