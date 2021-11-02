const estimationSer = require("../service/estimationService");
const constant = require("../constant");
const estimationHeaderAtrributeSer = require("../service/estimationService");

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

//-----------------  Delete
module.exports.estimationDelete = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromestimationSer = await estimationSer.estimationDelete(req.params);
        responce.status = 200;
        responce.message = constant.estimationMessage.ESTIMATION_DELETE;
        responce.body = responceFromestimationSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

module.exports.getById = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceGetById = await estimationSer.getById(req.params);
        responce.status = 200;
        responce.message = constant.estimationMessage.ESTIMATION_FETCH;
        responce.body = responceGetById;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

module.exports.createEstimationHeader = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {

        const responceFromestimationSer = await estimationSer.createEstimationHeader(req.body);
        responce.status = 200;
        responce.message = constant.estimationMessage.ESTIMATION_CREATED;
        responce.body = responceFromestimationSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

module.exports.getRecentEstimation = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromestimationSer = await estimationSer.getRecentEstimation(req.query);
        responce.status = 200;
        responce.message = constant.estimationMessage.ESTIMATION_FETCH;
        responce.body = responceFromestimationSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);


}

module.exports.updateEstimationHeader = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
        console.log("Estimation Header Id"+ req.params.id);

        const responceFromestimationSer = await estimationSer.updateEstimationHeader({
            id:req.params.id,
            updatedInfo:req.body,
        });
        responce.status = 200;
        responce.message = constant.estimationMessage.ESTIMATION_UPDATE;
        responce.body = responceFromestimationSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}
//===========================EstimationHeaderAtrribute=======================================================


module.exports.createEstimationHeaderAtrribute = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationHeaderAtrributeSer = await estimationHeaderAtrributeSer.createEstimationHeaderAtrribute(req.body.estattlist);
        responce.status = 200;
        responce.message = constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_CREATED;
        responce.body = responceFromEstimationHeaderAtrributeSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- get estimation by ID
module.exports.getEstimationHeaderAtrributeById = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationHeaderAtrributeSer = await estimationHeaderAtrributeSer.getEstimationHeaderAtrributeById(req.params);
        responce.status = 200;
        responce.message = constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_FETCH;
        responce.body = responceFromEstimationHeaderAtrributeSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}
//----------------- get all estimationHeaderAtrribute
module.exports.getAllEstimationHeaderAtrribute = async (req, res) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>calc")
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationHeaderAtrributeSer = await estimationHeaderAtrributeSer.getAllEstimationHeaderAtrribute(req.query);
        responce.status = 200;
        responce.message = constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_FETCH;
        responce.body = responceFromEstimationHeaderAtrributeSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Update
module.exports.estimationHeaderAtrributeUpdate = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationHeaderAtrributeSer = await estimationHeaderAtrributeSer.estimationHeaderAtrributeUpdate({
            id: req.params.id,
            updateInfo: req.body,
        });
        responce.status = 200;
        responce.message = constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_UPDATE;
        responce.body = responceFromEstimationHeaderAtrributeSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//-----------------  Delete
module.exports.estimationHeaderAtrributeDelete = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationHeaderAtrributeSer = await estimationHeaderAtrributeSer.estimationHeaderAtrributeDelete(req.params);
        responce.status = 200;
        responce.message = constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_DELETE;
        responce.body = responceFromEstimationHeaderAtrributeSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}
//==========================================EstimationHeaderAtrributeCalc================================
module.exports.createEstimationHeaderAtrributeCalc = async (req, res) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>calc")
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationHeaderAtrributeCalcSer = estimationHeaderAtrributeSer.createEstimationHeaderAtrributeCalc(req.body);
        console.log("HIHIHiHiHIHI")
        responce.status = 200;
        responce.message = constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_CREATED;
        responce.body = responceFromEstimationHeaderAtrributeCalcSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- get estimation by ID
module.exports.getEstimationHeaderAtrributeCalcById = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationHeaderAtrributeCalcSer = await estimationHeaderAtrributeSer.getEstimationHeaderAtrributeCalcById(req.params);
        responce.status = 200;
        responce.message = constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_FETCH;
        responce.body = responceFromEstimationHeaderAtrributeCalcSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}
//----------------- get all estimationHeaderAtrributeSer
module.exports.getAllEstimationHeaderAtrributeCalc = async (req, res) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>calc")
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationHeaderAtrributeCalcSer = await estimationHeaderAtrributeSer.getAllEstimationHeaderAtrributeCalc(req.query);
        responce.status = 200;
        responce.message = constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_FETCH;
        responce.body = responceFromEstimationHeaderAtrributeCalcSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Update
module.exports.estimationHeaderAtrributeCalcUpdate = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationHeaderAtrributeCalcSer = await estimationHeaderAtrributeSer.estimationHeaderAtrributeCalcUpdate({
            id: req.params.id,
            updateInfo: req.body,
        });
        responce.status = 200;
        responce.message = constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_UPDATE;
        responce.body = responceFromEstimationHeaderAtrributeCalcSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//-----------------  Delete
module.exports.estimationHeaderAtrributeCalcDelete = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationHeaderAtrributeCalcSer = await estimationHeaderAtrributeSer.estimationHeaderAtrributeCalcDelete(req.params);
        responce.status = 200;
        responce.message = constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_DELETE;
        responce.body = responceFromEstimationHeaderAtrributeCalcSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}





