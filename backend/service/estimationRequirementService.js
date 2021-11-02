
const constant = require("../constant")
const EstimationCalcAttr = require("../database/models/estimationCalcAttrModel")
const Client = require("../database/models/clientModel")
const EstHeaderModel = require("../database/models/estHeaderModel")
const ProjectRequirement = require("../database/models/projectRequirement")
const EstHeaderRequirement = require("../database/models/estHeaderRequirement")

const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")


module.exports.create = async (serviceData) => {
  try {
    let projectRequirement = new ProjectRequirement({ ...serviceData })
    const findProject = await ProjectRequirement.find({title :  projectRequirement.title },{project :  projectRequirement.project },);
    if(findProject.length != 0){
         throw new Error(constant.requirmentMessage.DUPLICATE_REQUIREMENT);
    }  
    let result = await projectRequirement.save();
    const savedProjectRequirement = await ProjectRequirement.find({title :  projectRequirement.title },{project :  projectRequirement.project },);
     

    const estHeaderModel = await EstHeaderModel.findById({ _id: serviceData.estHeader })
    if (estHeaderModel.length == 0) {
       throw new Error(constant.estimationMessage.INVALID_ID);
    }
      
    let estHeaderRequirement = new EstHeaderRequirement({requirement: result._id ,estHeader: estHeaderModel._id})
    let result_estHeaderRequirement = await estHeaderRequirement.save();
      
   

    return formatMongoData(result)
  } catch (err) {
    console.log("something went wrong: service > ProjectService ", err);
    throw new Error(err)
  }
}
