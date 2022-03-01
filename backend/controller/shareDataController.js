const clientSer = require("../service/shareDataService");
const constant = require("../constant");

module.exports.createShareData = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceFromClientSer = await clientSer.createShareData(req.body);
    responce.status = 200;
    responce.message = constant.SharingMessage.Sharing_CREATED;
    responce.body = responceFromClientSer;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};

module.exports.GetSharingData = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceFromClientSer = await clientSer.GetSharingData(req.query);
    responce.status = 200;
    responce.message = constant.SharingMessage.GetSharingData;
    responce.body = responceFromClientSer;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};
