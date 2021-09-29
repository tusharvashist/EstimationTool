const projectSer  =  require("../service/projectService");
const constant =  require("../constant");

//----------------- Create Project 
module.exports.createProject = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
       const responceFromProjectSer = await projectSer.createProject(req.body);
        responce.status = 200;
        responce.message = constant.projectMessage.PROJECT_CREATED;
        responce.body = responceFromProjectSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Get Project By ID
module.exports.getProjectById = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
        const responceFromProjectSer = await projectSer.getProjectById(req.params);
        responce.status = 200;
        responce.message = constant.projectMessage.PROJECT_FETCH;
        responce.body = responceFromProjectSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Get All Project
module.exports.getAllProject = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
        const responceFromProjectSer = await projectSer.getAllProject(req.query);
        responce.status = 200;
        responce.message = constant.projectMessage.PROJECT_FETCH;
        responce.body = responceFromProjectSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Update Project
module.exports.projectUpdate = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
        const responceFromProjectSer = await projectSer.projectUpdate({
            id:req.params.id,
            updateInfo:req.body,
        });
        responce.status = 200;
        responce.message = constant.projectMessage.PROJECT_UPDATE;
        responce.body = responceFromProjectSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//-----------------  Delete Project
module.exports.projectDelete = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
       const responceFromProjectSer = await projectSer.projectDelete(req.params);
        responce.status = 200;
        responce.message = constant.projectMessage.PROJECT_DELETE;
        responce.body = responceFromProjectSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}


