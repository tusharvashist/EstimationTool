const tokenSer = require("../service/moduleTokenService");
const constant = require("../constant");

//----------------- Create Module Token 
module.exports.createModuleToken = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceSer = await tokenSer.createModuleToken(req.body);
        responce.status = 200;
        responce.message = constant.TokenMessage.MODULETOKEN_CREATED;
        responce.body = responceSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Get All Module Token 
module.exports.getAllModuleTokens = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceSer = await tokenSer.getAllModuleTokens(req.query);
        responce.status = 200;
        responce.message = constant.TokenMessage.MODULETOKEN_FETCH;
        responce.body = responceSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}