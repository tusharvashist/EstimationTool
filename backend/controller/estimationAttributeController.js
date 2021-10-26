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

