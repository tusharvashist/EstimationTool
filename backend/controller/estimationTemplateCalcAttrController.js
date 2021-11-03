const estimationTemplateCalcAttrSer = require("../service/estimationTemplateCalcAttrService");
const constant = require("../constant");

//----------------- Create estimationTemplateCalcAttr 
module.exports.createEstimationTemplateCalcAttr = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationTemplateCalcAttrSer = await estimationTemplateCalcAttrSer.createEstimationTemplateCalcAttr(req.body);
        responce.status = 200;
        responce.message = constant.estimationTemplateCalcAttrMessage.ESTIMATIONTEMPLATECALCATTR_CREATED;
        responce.body = responceFromEstimationTemplateCalcAttrSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Get estimationTemplateCalcAttr By ID
module.exports.getEstimationTemplateCalcAttrById = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationTemplateCalcAttrSer = await estimationTemplateCalcAttrSer.getEstimationTemplateCalcAttrById(req.params);
        responce.status = 200;
        responce.message = constant.estimationTemplateCalcAttrMessage.ESTIMATIONTEMPLATECALCATTR_FETCH;
        responce.body = responceFromEstimationTemplateCalcAttrSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Get All estimationTemplateCalcAttr
module.exports.getAllEstimationTemplateCalcAttr = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationTemplateCalcAttrSer = await estimationTemplateCalcAttrSer.getAllEstimationTemplateCalcAttr(req.query);
        responce.status = 200;
        responce.message = constant.estimationTemplateCalcAttrMessage.ESTIMATIONTEMPLATECALCATTR_FETCH;
        responce.body = responceFromEstimationTemplateCalcAttrSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//--------------------------------------------
//Get All Attribute based on EstHeader or EstType
// module.exports.getAllEstimationAttributes = async (req, res) => {
//     let responce = { ...constant.defaultResponce };
//     try {
//         const responceFromestimationSer = await estimationAttSer.getAllEstimationAttributes(req.query);        
//         responce.status = 200;
//         responce.message = constant.EstimationAttributeMessage.ATTRIBUTE_FETCH;
//         responce.body = responceFromestimationSer;
//     } catch (err) {
//         responce.message = err.message;
//     }
//     return res.status(responce.status).send(responce);
//------------

//----------------- Update estimationTemplateCalcAttr
module.exports.estimationTemplateCalcAttrUpdate = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationTemplateCalcAttrSer = await estimationTemplateCalcAttrSer.estimationTemplateCalcAttrUpdate({
            id: req.params.id,
            updateInfo: req.body,
        });
        responce.status = 200;
        responce.message = constant.estimationTemplateCalcAttrMessage.ESTIMATIONTEMPLATECALCATTR_UPDATE;
        responce.body = responceFromEstimationTemplateCalcAttrSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//-----------------  Delete estimationTemplateCalcAttr
module.exports.estimationTemplateCalcAttrDelete = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationTemplateCalcAttrSer = await estimationTemplateCalcAttrSer.estimationTemplateCalcAttrDelete(req.params);
        responce.status = 200;
        responce.message = constant.estimationTemplateCalcAttrMessage.ESTIMATIONTEMPLATECALCATTR_DELETE;
        responce.body = responceFromEstimationTemplateCalcAttrSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}


