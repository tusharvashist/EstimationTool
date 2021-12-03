
const resourceRoleMasterSer = require("../service/resourceRoleMasterService");
const constant = require("../constant");
module.exports.getAllResourceRoleMaster = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromResourceRoleMaster = await resourceRoleMasterSer.getAllResources(req.query);
        responce.status = 200;
        responce.message = constant.resourceRoleMasterMessage.RESOURCEROLEMASTER_FETCH;
        responce.body = responceFromResourceRoleMaster;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

module.exports.createResourceRoleMaster = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromRoleSer = await resourceRoleMasterSer.createResourceRoleMaster(req.body);
        responce.status = 200;
        responce.message = constant.resourceRoleMasterMessage.RESOURCEROLEMASTER_CREATED;
        responce.body = responceFromRoleSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

module.exports.createEstResourcePlanning = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromRoleSer = await resourceRoleMasterSer.createEstResourcePlanning(req.body);
        responce.status = 200;
        responce.message = constant.resourceRoleMasterMessage.RESOURCEROLEMASTER_CREATED;
        responce.body = responceFromRoleSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}