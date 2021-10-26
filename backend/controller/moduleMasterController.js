const moduleSer = require("../service/moduleMasterService");
const constant = require("../constant");

//----------------- Create Module 
module.exports.createModuleMaster = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceSer = await moduleSer.createModuleMaster(req.body);
        responce.status = 200;
        responce.message = constant.moduleMessage.MODULE_CREATED;
        responce.body = responceSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Get All Module
module.exports.getAllModulemaster = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceSer = await moduleSer.getAllModuleMaster(req.query);
        responce.status = 200;
        responce.message = constant.moduleMessage.Modu;
        responce.body = responceSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}