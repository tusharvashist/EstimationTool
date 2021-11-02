const estimationRequirementService = require("../service/estimationRequirementService");
const constant = require("../constant");

module.exports.create = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceGetByID = await estimationRequirementService.create(req.body);
        responce.status = 200;
        responce.message = constant.requirmentMessage.REQUIREMENT_CREATED;
        responce.body = responceGetByID;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}



