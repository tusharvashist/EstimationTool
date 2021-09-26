const clientSer  =  require("../service/clientService");
const constant =  require("../constant");

module.exports.createClient = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
       const responceFromClientSer = await clientSer.createClient(req.body);
        responce.status = 200;
        responce.message = constant.clientMessage.CLIENT_CREATED;
        responce.body = responceFromClientSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- get estimation by ID
module.exports.getClientById = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
        const responceFromClientSer = await clientSer.getClientById(req.params);
        responce.status = 200;
        responce.message = constant.clientMessage.CLIENT_FETCH;
        responce.body = responceFromClientSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}
//----------------- get all client
module.exports.getAllClient = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
        const responceFromClientSer = await clientSer.getAllClient(req.query);
        responce.status = 200;
        responce.message = constant.clientMessage.CLIENT_FETCH;
        responce.body = responceFromClientSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//----------------- Update
module.exports.clientUpdate = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
        const responceFromClientSer = await clientSer.clientUpdate({
            id:req.params.id,
            updateInfo:req.body,
        });
        responce.status = 200;
        responce.message = constant.clientMessage.CLIENT_UPDATE;
        responce.body = responceFromClientSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

//-----------------  Delete
module.exports.clientDelete = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
       const responceFromClientSer = await clientSer.clientDelete(req.params);
        responce.status = 200;
        responce.message = constant.clientMessage.CLIENT_DELETE;
        responce.body = responceFromClientSer;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}


