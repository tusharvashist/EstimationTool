const locationMasterSer = require("../service/locationMasterService");
const constant = require("../constant");

module.exports.getAllEstmationHeaderLocation = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceSer = await locationMasterSer.getAllEstmationHeaderLocation(
      req.query
    );
    responce.status = 200;
    responce.message = constant.requirementTagMessage.REQUIREMENTTAG_FETCH;
    responce.body = responceSer;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};

module.exports.getAllLocations = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceSer = await locationMasterSer.getAllLocations();
    responce.status = 200;
    responce.message = constant.requirementTagMessage.REQUIREMENTTAG_FETCH;
    responce.body = responceSer;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};
