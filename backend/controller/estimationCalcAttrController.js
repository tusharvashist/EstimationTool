const estimationCalcAttrSer = require("../service/estimationCalcAttrService");
const constant = require("../constant");

//----------------- Create Estimation calaculate attribute
module.exports.createEstimationCalcAttr = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationCalcAttrSer = await estimationCalcAttrSer.createEstimationCalcAttr(req.body);
        responce.status = 200;
        responce.message = constant.estimationCalcAttrMessage.ESTIMATIONCALCATTR_CREATED;
        responce.body = responceFromEstimationCalcAttrSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Get Estimation calaculate attribute By ID
module.exports.getEstimationCalcAttrById = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationCalcAttrSer = await estimationCalcAttrSer.getEstimationCalcAttrById(req.params);
        responce.status = 200;
        responce.message = constant.estimationCalcAttrMessage.ESTIMATIONCALCATTR_FETCH;
        responce.body = responceFromEstimationCalcAttrSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Get All Estimation calaculate attribute
module.exports.getAllEstimationCalcAttr = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationCalcAttrSer = await estimationCalcAttrSer.getAllEstimationCalcAttr(req.query);
        responce.status = 200;
        responce.message = constant.estimationCalcAttrMessage.ESTIMATIONCALCATTR_FETCH;
        responce.body = responceFromEstimationCalcAttrSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Update Estimation calaculate attribute
module.exports.estimationCalcAttrUpdate = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationCalcAttrSer = await estimationCalcAttrSer.estimationCalcAttrUpdate({
            id: req.params.id,
            updateInfo: req.body,
        });
        responce.status = 200;
        responce.message = constant.estimationCalcAttrMessage.ESTIMATIONCALCATTR_UPDATE;
        responce.body = responceFromEstimationCalcAttrSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//-----------------  Delete estimation calc attr
module.exports.estimationCalcAttrDelete = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationCalcAttrSer = await estimationCalcAttrSer.estimationCalcAttrDelete(req.params);
        responce.status = 200;
        responce.message = constant.estimationCalcAttrMessage.ESTIMATIONCALCATTR_DELETE;
        responce.body = responceFromEstimationCalcAttrSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}


