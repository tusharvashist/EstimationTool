
const constant = require("../constant")
const Project = require("../database/models/projectModel")
const {formatMongoData} = require("../helper/dbhelper")
const mongoose = require("mongoose")

module.exports.createProject = async(serviceData)=>{
  try{
    let project = new Project({...serviceData})
    let result =  await project.save();
    return formatMongoData(result)
  }catch(err){
    console.log("something went wrong: service > ProjectService ", err);
    throw new Error(err)
  }
}


module.exports.getAllProject = async({skip = 0,limit = 10})=>{
    try{
      let project = await Project.find({}).skip(parseInt(skip)).limit(parseInt(limit));
      return formatMongoData(project)
    }catch(err){
      console.log("something went wrong: service > ProjectService ", err);
      throw new Error(err)
    }
}

module.exports.getProjectById = async({id})=>{
    try{
      if(!mongoose.Types.ObjectId(id)){
        throw new Error(constant.projectMessage.INVALID_ID)
      }
      let project = await Project.findById(id)
      if(!project){
          throw new Error(constant.projectMessage.PROJECT_NOT_FOUND)
      }
      return formatMongoData(project)
    }catch(err){
      console.log("something went wrong: service > projectservice ", err);
      throw new Error(err)
    }
}

module.exports.projectUpdate = async({id,updateInfo})=>{
    try{
    
      let project = await Project.findOneAndUpdate({_id:id},updateInfo,{new:true});
      if(!project){
          throw new Error(constant.projectMessage.PROJECT_NOT_FOUND)
      }
      return formatMongoData(project)
    }catch(err){
      console.log("something went wrong: service > projectservice ", err);
      throw new Error(err)
    }
}


module.exports.projectDelete = async({id})=>{
    try{
      let project = await Project.findByIdAndDelete(id);
      if(!project){
          throw new Error(constant.projectMessage.PROJECT_NOT_FOUND)
      }
      return formatMongoData(project)
    }catch(err){
      console.log("something went wrong: service > projectservice ", err);
      throw new Error(err)
    }
}