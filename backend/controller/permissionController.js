const permissionSer = require("../service/permissionService");
const constant = require("../constant");


module.exports.createPermission = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const resdata = await permissionSer.createPermission(req.body);
        responce.status = 200;
        responce.message = constant.PermssionMessage.PERMISSION_CREATED;
        responce.body = resdata;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//Get All Permission
module.exports.getAllPermission = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const resdata = await permissionSer.getAllPermission(req.body);
        responce.status = 200;
        responce.message = constant.PermssionMessage.PERMISSION_FETCH;
        responce.body = resdata;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

module.exports.getAllUserPermission = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const resdata = await permissionSer.getAllUserPermission(req.query);        
        responce.status = 200;
        responce.message = constant.PermssionMessage.PERMISSION_FETCH;
        responce.body = resdata;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

