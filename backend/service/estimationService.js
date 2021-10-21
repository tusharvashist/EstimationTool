
const constant = require("../constant")
const Estimation = require("../database/models/estimationModel")
const EstimationHeader = require("../database/models/estHeaderModel")
const {formatMongoData} = require("../helper/dbhelper")
const mongoose = require("mongoose")

module.exports.createEstimation = async(serviceData)=>{
  try{
    let estimation = new Estimation({...serviceData})
    let result =  await estimation.save();
    return formatMongoData(result)
  }catch(err){
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}


module.exports.getAllEstimation = async({skip = 0,limit = 10})=>{
    try{
      let estimations = await Estimation.find({}).skip(parseInt(skip)).limit(parseInt(limit));
      return formatMongoData(estimations)
    }catch(err){
      console.log("something went wrong: service > createEstimation ", err);
      throw new Error(err)
    }
}

module.exports.getAllEstimationById = async({id})=>{
    try{
      if(!mongoose.Types.ObjectId(id)){
        throw new Error(constant.estimationMessage.INVALID_ID)
      }
      let estimation = await Estimation.findById(id)
      if(!estimation){
          throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND)
      }
      return formatMongoData(estimation)
    }catch(err){
      console.log("something went wrong: service > createEstimation ", err);
      throw new Error(err)
    }
}

module.exports.estimationUpdate = async({id,updateInfo})=>{
    try{
    
      let estimation = await Estimation.findOneAndUpdate({_id:id},updateInfo,{new:true});
      if(!estimation){
          throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND)
      }
      return formatMongoData(estimation)
    }catch(err){
      console.log("something went wrong: service > createEstimation ", err);
      throw new Error(err)
    }
}


module.exports.estimationDelete = async({id})=>{
    try{
      let estimation = await Estimation.findByIdAndDelete(id);
      if(!estimation){
          throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND)
      }
      return formatMongoData(estimation)
    }catch(err){
      console.log("something went wrong: service > createEstimation ", err);
      throw new Error(err)
    }
}


module.exports.getRecentEstimation = async({skip = 0,limit = 10})=>{
  try{
    let estimations = await EstimationHeader.find({}).skip(parseInt(skip)).limit(parseInt(limit));
    return formatMongoData(estimations)
  }catch(err){
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}


module.exports.createEstimationHeader = async(serviceData)=>{
  try{
    let estimation = new EstimationHeader({...serviceData})
    let result =  await estimation.save();
    return formatMongoData(result)
  }catch(err){
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}