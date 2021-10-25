const pageSer = require("../service/pageMasterService");
const constant = require("../constant");

//----------------- Create Role 
module.exports.createPageMaster = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceSer = await pageSer.createPageMaster(req.body);
        responce.status = 200;
        responce.message = constant.pageMessage.PAGE_CREATED;
        responce.body = responceSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Get All Role
module.exports.getAllPagemaster = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceSer = await pageSer.getAllPageMaster(req.query);
        responce.status = 200;
        responce.message = constant.pageMessage.PAGE_FETCH;
        responce.body = responceSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}