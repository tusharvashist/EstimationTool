const roleSer = require("../service/roleMasterService");
const constant = require("../constant");

//----------------- Create Role 
module.exports.createRole = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromRoleSer = await roleSer.createRole(req.body);
        responce.status = 200;
        responce.message = constant.roleMessage.ROLE_CREATED;
        responce.body = responceFromRoleSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Get Role By ID
module.exports.getRoleById = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromRoleSer = await roleSer.getRoleById(req.params);
        responce.status = 200;
        responce.message = constant.roleMessage.ROLE_FETCH;
        responce.body = responceFromRoleSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Get All Role
module.exports.getAllRole = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromRoleSer = await roleSer.getAllRole(req.query);
        responce.status = 200;
        responce.message = constant.roleMessage.ROLE_FETCH;
        responce.body = responceFromRoleSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

module.exports.getAllSharingRole = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceFromRoleSer = await roleSer.getAllSharingRole();
    responce.status = 200;
    responce.message = constant.roleMessage.ROLE_FETCH;
    responce.body = responceFromRoleSer;
  } catch (err) {
    responce.message = err.message;
  }
  return res.status(responce.status).send(responce);
};

//----------------- Update Role
module.exports.roleUpdate = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromRoleSer = await roleSer.roleUpdate({
            id: req.params.id,
            updateInfo: req.body,
        });
        responce.status = 200;
        responce.message = constant.roleMessage.ROLE_UPDATE;
        responce.body = responceFromRoleSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//-----------------  Delete Role
module.exports.roleDelete = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromRoleSer = await roleSer.roleDelete(req.params);
        responce.status = 200;
        responce.message = constant.roleMessage.ROLE_DELETE;
        responce.body = responceFromRoleSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}


