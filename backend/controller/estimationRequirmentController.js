const estimationRequirementService = require("../service/estimationRequirementService");
const constant = require("../constant");

module.exports.create = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceGetByID = await estimationRequirementService.create(req.body);
        responce.status = 200;
        responce.message = constant.requirementMessage.REQUIREMENT_CREATED;
        responce.body = responceGetByID;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

module.exports.update = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
        const responceFromClientSer = await estimationRequirementService.updateRequirement({
            id:req.params.id,
            updateInfo:req.body,
        });
        responce.status = 200;
        responce.message = constant.requirementMessage.REQUIREMENT_UPDATE;
        responce.body = responceFromClientSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

module.exports.getById = async (req, res) => {
    let responce =
        { ...constant.defaultResponce };
    try {
        const responceGetById = await estimationRequirementService.getById(req.params);
        responce.status = 200;
        responce.message = constant.requirementMessage.REQUIREMENT_FETCH;
        responce.body = responceGetById;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

module.exports.updateRequirementData = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceGetByID = await estimationRequirementService.updateRequirementData(req.body);
        responce.status = 200;
        responce.message = constant.requirementMessage.REQUIREMENT_DATA_UPDATE;
        responce.body = responceGetByID;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//-----------------  Delete
module.exports.requirementDelete = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
       const responce = await estimationRequirementService.deleteRequirementData(req.params.id);
        responce.status = 200;
        responce.message = constant.requirementMessage.REQUIREMENT_DELETE;
        responce.body = responce;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}


