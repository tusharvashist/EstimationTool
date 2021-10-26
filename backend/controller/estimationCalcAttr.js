const estimationCalcAttrSer = require("../service/estimationCalcAttr");
const constant = require("../constant");

//----------------- Create Project 
module.exports.createProject = async (req, res) => {
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

//----------------- Get Project By ID
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

//----------------- Get All Project
module.exports.getAllEstimationCalcAttr = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromProjectSer = await projectSer.getAllEstimationCalcAttr(req.query);
        responce.status = 200;
        responce.message = constant.estimationCalcAttrMessage.ESTIMATIONCALCATTR_FETCH;
        responce.body = responceFromProjectSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Update Project
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

//-----------------  Delete Project
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


