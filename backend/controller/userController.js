const signupSer  =  require("../service/userService");
const constant =  require("../constant");


module.exports.signup = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
        
       const responceFromUserService = await signupSer.signup(req.body);
        responce.status = 200;
        responce.message = constant.userMessage.SIGNUP_SUCCESS;
        responce.body = responceFromUserService;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}

module.exports.login = async (req,res)=>{
    let responce = {...constant.defaultResponce};
    try{
        
       const responceFromUserService = await signupSer.login(req);
        responce.status = 200;
        responce.message = constant.userMessage.LOGIN_SUCCESS;
        responce.body = responceFromUserService;
    }catch(err){
        responce.message = err.message;
    }
    return res.status(responce.status).send(responce);
}
