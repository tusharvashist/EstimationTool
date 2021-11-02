const estimationAttSer = require("../service/estimationAttributeService");
const constant = require("../constant");


module.exports.createEstimationAttribute = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromestimationSer = await estimationAttSer.createEstimationAttribute(req.body);
        responce.status = 200;
        responce.message = constant.EstimationAttributeMessage.ATTRIBUTE_CREATED;
        responce.body = responceFromestimationSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//Create Estimation Template Attribute for Selection
module.exports.createEstimationTempplateAttribute = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromestimationSer = await estimationAttSer.createEstimationTempplateAttribute(req.body);
        responce.status = 200;
        responce.message = constant.EstimationAttributeMessage.ATTRIBUTE_CREATED;
        responce.body = responceFromestimationSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//Get All Attribute based on EstHeader or EstType
module.exports.getAllEstimationAttributes = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromestimationSer = await estimationAttSer.getAllEstimationAttributes(req.query);        
        responce.status = 200;
        responce.message = constant.EstimationAttributeMessage.ATTRIBUTE_FETCH;
        responce.body = responceFromestimationSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

