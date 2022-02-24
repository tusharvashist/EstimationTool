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

// //----------------- get estimation by ID
// module.exports.getClientById = async (req,res)=>{
//     let responce = {...constant.defaultResponce};
//     try{
//         const responceFromClientSer = await clientSer.getClientById(req.params);
//         responce.status = 200;
//         responce.message = constant.clientMessage.CLIENT_FETCH;
//         responce.body = responceFromClientSer;
//     }catch(err){
//         responce.message = err.message;
//     }
//     return res.status(responce.status).send(responce);
// }
// //----------------- get all client
// module.exports.getAllClient = async (req,res)=>{
//     let responce = {...constant.defaultResponce};
//     try{
//         const responceFromClientSer = await clientSer.getAllClient(req.query);
//         responce.status = 200;
//         responce.message = constant.clientMessage.CLIENT_FETCH;
//         responce.body = responceFromClientSer;
//     }catch(err){
//         responce.message = err.message;
//     }
//     return res.status(responce.status).send(responce);
// }

// //----------------- Update
// module.exports.clientUpdate = async (req,res)=>{
//     let responce = {...constant.defaultResponce};
//     try{
//         const responceFromClientSer = await clientSer.clientUpdate({
//             id:req.params.id,
//             updateInfo:req.body,
//         });
//         responce.status = 200;
//         responce.message = constant.clientMessage.CLIENT_UPDATE;
//         responce.body = responceFromClientSer;
//     }catch(err){
//         responce.message = err.message;
//     }
//     return res.status(responce.status).send(responce);
// }

// //-----------------  Delete
// module.exports.clientDelete = async (req,res)=>{
//     let responce = {...constant.defaultResponce};
//     try{
//        const responceFromClientSer = await clientSer.clientDelete(req.params);
//         responce.status = 200;
//         responce.message = constant.clientMessage.CLIENT_DELETE;
//         responce.body = responceFromClientSer;
//     }catch(err){
//         responce.message = err.message;
//     }
//     return res.status(responce.status).send(responce);
// }


