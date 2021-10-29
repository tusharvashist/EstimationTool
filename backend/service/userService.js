
const constant = require("../constant");
const userModel = require("../database/models/userModel");
const {formatMongoData} = require("../helper/dbhelper");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


module.exports.signup = async({email,pass,first_name,
    last_name})=>{
    try{
     const user = await userModel.findOne({email});
     if(user){
         throw new Error(constant.userMessage.DUPLICATE_EMAIL);
     }
     pass = await bcrypt.hash(pass,12);
     const newUser = new userModel({email,pass,first_name,last_name});
     let result = await newUser.save();
     return formatMongoData(result)
    }catch(err){
      console.log("something went wrong: service > createEstimation ", err);
      throw new Error(err)
    }
  }
  
  // module.exports.login = async({email,pass})=>{
  //   try{
  //    const user = await userModel.findOne({email});
  //    if(!user){
  //        throw new Error(constant.userMessage.USER_NOT_FOUND);
  //    }
  //    const isValid = await bcrypt.compare(pass, user.pass);
  //    if(!isValid){
  //       throw new Error(constant.userMessage.INVALID_PASS);
  //    }
  //    var token = jwt.sign({ id: user._id },process.env.SECRET_KEY || "py-estimation#$#", {expiresIn:"1d"});
  //    return {token};
  //   }catch(err){
  //     console.log("something went wrong: service > createEstimation ", err);
  //     throw new Error(err)
  //   }
  // }

  module.exports.login = async(req)=>{
    try {
      const headresEmailAndPass = req.headers.authorization.split('Basic ')[1].replace('"', '');
      const emailNpass = Buffer.from(headresEmailAndPass, 'base64').toString().split(":");
      const email = emailNpass[0].trim();
      const pass = emailNpass[1].trim();
      const user = await userModel.findOne({ email });
      if (!user) {
        throw new Error(constant.userMessage.USER_NOT_FOUND);
      }
      const isValid = await bcrypt.compare(pass, user.pass);
      if (!isValid) {
        throw new Error(constant.userMessage.INVALID_PASS);
      }
      var token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || "py-estimation#$#", { expiresIn: "1d" });
      var responce = {email:user.email,first_name:user.first_name,last_name:user.last_name, token: token};
     
      return responce;
    }catch(err){
      console.log("something went wrong: service > createEstimation ", err);
      throw new Error(err)
    }
  }