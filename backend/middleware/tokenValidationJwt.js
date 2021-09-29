const Joi = require("joi");
const JoiSchema = require("../apiSchma/joiEstimationSchema");
const constant = require("../constant");
const jwt = require('jsonwebtoken');
module.exports.validateToken = (req,res,next) => {
    let responce = { ...constant.defaultResponce };
    try{
        if(!req.headers.authorization){
            throw new Error(constant.requestValidationMessage.TOKEN_MISSING)
        }
        const token = req.headers.authorization.split('Bearer ')[1].replace('"','');
        let decoded = jwt.verify(token, process.env.SECRET_KEY || 'py-estimation#$#')
        return next()
    }catch(err){
        console.log("error:" ,err);
        responce.message = err.message;
        responce.status = 401;
    }
    return res.status(responce.status).send(responce);
}