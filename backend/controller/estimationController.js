const estimationSer  =  require("../service/estimationService");
const constant =  require("../constant");

// module.exports.createEstimation = async (req,res)=>{
//     let responce = {...constant.defaultResponce};
//     try{
        
//        const responceFromestimationSer = await estimationSer.createEstimation(req.body);
//         responce.status = 200;
//         responce.message = constant.estimationMessage.ESTIMATION_CREATED;
//         responce.body = responceFromestimationSer;
//     }catch(err){
//         responce.message = err.message;
//     }
//     return res.status(responce.status).send(responce);
// }

// //----------------- get all estimation
// module.exports.getAllEstimationById = async (req,res)=>{
//     let responce = {...constant.defaultResponce};
//     try{
//         const responceFromestimationSer = await estimationSer.getAllEstimationById(req.params);
//         responce.status = 200;
//         responce.message = constant.estimationMessage.ESTIMATION_FETCH;
//         responce.body = responceFromestimationSer;
//     }catch(err){
//         responce.message = err.message;
//     }
//     return res.status(responce.status).send(responce);
// }
// //----------------- get by id
// module.exports.getAllEstimation = async (req,res)=>{
//     let responce = {...constant.defaultResponce};
//     try{
//         const responceFromestimationSer = await estimationSer.getAllEstimation(req.query);
//         responce.status = 200;
//         responce.message = constant.estimationMessage.ESTIMATION_FETCH;
//         responce.body = responceFromestimationSer;
//     }catch(err){
//         responce.message = err.message;
//     }
//     return res.status(responce.status).send(responce);
// }

// //----------------- Update
// module.exports.estimationUpdate = async (req,res)=>{
//     let responce = {...constant.defaultResponce};
//     try{
//         const responceFromestimationSer = await estimationSer.estimationUpdate({
//             id:req.params.id,
//             updateInfo:req.body,
//         });
//         responce.status = 200;
//         responce.message = constant.estimationMessage.ESTIMATION_UPDATE;
//         responce.body = responceFromestimationSer;
//     }catch(err){
//         responce.message = err.message;
//     }
//     return res.status(responce.status).send(responce);
// }

// //-----------------  Delete
// module.exports.estimationDelete = async (req,res)=>{
//     let responce = {...constant.defaultResponce};
//     try{
//        const responceFromestimationSer = await estimationSer.estimationDelete(req.params);
//         responce.status = 200;
//         responce.message = constant.estimationMessage.ESTIMATION_DELETE;
//         responce.body = responceFromestimationSer;
//     }catch(err){
//         responce.message = err.message;
//     }
//     return res.status(responce.status).send(responce);
// }



module.exports.createEstimationHeader = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
        
       const responceFromestimationSer = await estimationSer.createEstimationHeader(req.body);
        responce.status = 200;
        responce.message = constant.estimationMessage.ESTIMATION_CREATED;
        responce.body = responceFromestimationSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

module.exports.getRecentEstimation = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
        const responceFromestimationSer = await estimationSer.getRecentEstimation(req.query);
        responce.status = 200;
        responce.message = constant.estimationMessage.ESTIMATION_FETCH;
        responce.body = responceFromestimationSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

