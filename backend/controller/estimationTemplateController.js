const estimationTemplateSer = require("../service/estimationTemplateService");
const constant = require("../constant");

//----------------- Create Project 
module.exports.createEstimationTemplate = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationTemplateSer = await estimationTemplateSer.createEstimationTemplate(req.body);
        responce.status = 200;
        responce.message = constant.estimationTemplateMessage.ESTIMATION_TEMPLATE_CREATED;
        responce.body = responceFromEstimationTemplateSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Get Project By ID
// module.exports.getProjectById = async (req,res)=>{
//     let responce = {...constant.defaultResponce};
//     try{
//         const responceFromProjectSer = await projectSer.getProjectById(req.params);
//         responce.status = 200;
//         responce.message = constant.projectMessage.PROJECT_FETCH;
//         responce.body = responceFromProjectSer;
//     }catch(err){
//         responce.message = err.message;
//     }
//     return res.status(responce.status).send(responce);
// }

//----------------- Get All Estimation Template
module.exports.getAllEstimationTemplate = async (req, res) => {
    let responce = { ...constant.defaultResponce };
    try {
        const responceFromEstimationTemplateSer = await estimationTemplateSer.getAllEstimationTemplate(req.query);
        responce.status = 200;
        responce.message = constant.estimationTemplateMessage.ESTIMATION_TEMPLATE_FETCH;
        responce.body = responceFromEstimationTemplateSer;
    } catch (err) {
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Update Project
// module.exports.projectUpdate = async (req,res)=>{
//     let responce = {...constant.defaultResponce};
//     try{
//         const responceFromProjectSer = await projectSer.projectUpdate({
//             id:req.params.id,
//             updateInfo:req.body,
//         });
//         responce.status = 200;
//         responce.message = constant.projectMessage.PROJECT_UPDATE;
//         responce.body = responceFromProjectSer;
//     }catch(err){
//         responce.message = err.message;
//     }
//     return res.status(responce.status).send(responce);
// }

//-----------------  Delete Project
// module.exports.projectDelete = async (req,res)=>{
//     let responce = {...constant.defaultResponce};
//     try{
//        const responceFromProjectSer = await projectSer.projectDelete(req.params);
//         responce.status = 200;
//         responce.message = constant.projectMessage.PROJECT_DELETE;
//         responce.body = responceFromProjectSer;
//     }catch(err){
//         responce.message = err.message;
//     }
//     return res.status(responce.status).send(responce);
// }


