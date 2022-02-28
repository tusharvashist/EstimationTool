const consolidatedAssumptionService  =  require("../service/consolidatedAssumptionService");
const constant =  require("../constant");

module.exports.createConsolidatedAssumption = async (req,res)=>{
    let response = {...constant.defaultResponse};
    try{
       const responseConsolidatedAssumptionService = await consolidatedAssumptionService.createConsolidatedAssumption(req.body);
        response.status = 200;
        response.message = constant.assumption.ASSUMPTION_CREATED;
        response.body = responseConsolidatedAssumptionService;
    }catch(err){
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}


module.exports.getTag = async (req,res)=>{
    let response = {...constant.defaultResponse};
    try{
       const responseConsolidatedAssumptionService = await consolidatedAssumptionService.getTag();
        response.status = 200;
        response.message = constant.assumption.ASSUMPTION_Tag_FETCH;
        response.body = responseConsolidatedAssumptionService;
    }catch(err){
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}


module.exports.getConsolidatedAssumption = async (req,res)=>{
    let response = {...constant.defaultResponse};
    try{
       const responseConsolidatedAssumptionService = await consolidatedAssumptionService.getConsolidatedAssumption();
        response.status = 200;
        response.message = constant.assumption.ASSUMPTION_FETCH;
        response.body = responseConsolidatedAssumptionService;
    }catch(err){
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.linkAssumptionWithEstimation = async (req,res)=>{
    let response = {...constant.defaultResponse};
    try{
       const responseConsolidatedAssumptionService = await consolidatedAssumptionService.linkAssumptionWithEstimation({
            id:req.params.id,
            updateInfo:req.body,
        });
        response.status = 200;
        response.message = constant.assumption.ASSUMPTION_FETCH;
        response.body = responseConsolidatedAssumptionService;
    }catch(err){
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getLinkAssumptionWithEstimation = async (req,res)=>{
    let response = {...constant.defaultResponse};
    try{
       const responseConsolidatedAssumptionService = await consolidatedAssumptionService.getLinkAssumptionWithEstimation(req.params.id);
        response.status = 200;
        response.message = constant.assumption.ASSUMPTION_FETCH;
        response.body = responseConsolidatedAssumptionService;
    }catch(err){
        response.message = err.message;
    }
    return res.status(response.status).send(response);
}