
const constant = require("../constant")
const {ObjectId} = require('mongodb');
const EstimationCalcAttr = require("../database/models/estimationCalcAttrModel")
const Client = require("../database/models/clientModel")
const EstHeaderModel = require("../database/models/estHeaderModel")
const ProjectRequirement = require("../database/models/projectRequirement")
const EstHeaderRequirement = require("../database/models/estHeaderRequirement")
const EstRequirementData =  require("../database/models/estRequirementData")
const { formatMongoData } = require("../helper/dbhelper")

//const EstimationHeaderAtrributeSchema = require("../database/models/estimationHeaderAtrributeModel")
//const EstHeaderRequirement = require("../database/models/estHeaderRequirement")
const RequirementType = require("../database/models/requirementType")
const RequirementTag = require("../database/models/requirementTag")
const EstimationHeaderAtrributeModel = require("../database/models/estimationHeaderAtrributeModel")



const mongoose = require("mongoose")


module.exports.create = async (serviceData) => {
  try {
    let projectRequirement = new ProjectRequirement({ ...serviceData })
    let result = await projectRequirement.save();
    const savedProjectRequirement = await ProjectRequirement.find({ title: projectRequirement.title }, { project: projectRequirement.project },);
    const estHeaderModel = await EstHeaderModel.findById({ _id: serviceData.estHeader })
    if (estHeaderModel.length == 0) {
       throw new Error(constant.estimationMessage.INVALID_ID);
    }
    let estHeaderRequirement = new EstHeaderRequirement({requirement: result._id ,estHeader: estHeaderModel._id ,isDeleted: false})
    let result_estHeaderRequirement = await estHeaderRequirement.save();
    return formatMongoData(result)
  } catch (err) {
    console.log("something went wrong: service > ProjectService ", err);
    throw new Error(err)
  }
}

module.exports.updateRequirementData = async (serviceDataArray) => {
  try {
    var length =0;
    serviceDataArray.data.forEach(async (serviceData) => {
      let estRequirementData = new EstRequirementData({ ...serviceData })

      let result = await EstRequirementData.findOneAndUpdate({
        ESTAttributeID: estRequirementData.ESTAttributeID,
        ESTHeaderRequirementID: estRequirementData.ESTHeaderRequirementID
        },
        estRequirementData,
        { upsert: true , new: true }
        );

      if (result) {
        var value = {
          requirement: estRequirementData.ESTHeaderRequirementID,
          estHeader: estRequirementData.ESTHeaderID
        };
       

        const estHeaderRequirement = await EstHeaderRequirement.findById(result.ESTHeaderRequirementID);
        estHeaderRequirement.estRequirementData.push(result);
       await estHeaderRequirement.save();
    
        
      }
      if (length === serviceDataArray.data.length-1) {
        return formatMongoData("done")
      } else {
        length = length+1
      }
  });
  } catch (err) {
    console.log("something went wrong: service > ProjectService ", err);
    throw new Error(err)
  }
}

module.exports.deleteRequirementData = async (id) => {
  try {
    let estHeaderRequirement = await EstHeaderRequirement.updateOne({_id:id}, { isDeleted: true });
    if (!estHeaderRequirement) {
      throw new Error(constant.clientMessage.CLIENT_NOT_FOUND)
    }
    return formatMongoData(estHeaderRequirement)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}



module.exports.getById = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.estimationMessage.INVALID_ID)
    }

    let estimations = await EstHeaderModel.findById({ _id: id }).
      populate({
        path: 'projectId',
        populate: { path: 'client' }
      }).populate({
        path: 'estTypeId'
      });

    let response = { ...constant.requirementResponse };
    response.basicDetails = estimations;

    let estHeaderRequirement = await EstHeaderRequirement.find({ estHeader: id }, { estHeader: 0 })
      .populate({
        path: 'requirement',
        populate: [{ path: 'tag' }, { path: 'type' }],
      }).populate({
        path: 'estRequirementData',
         populate: { path: 'ESTAttributeID' }
      })
    
    if (estHeaderRequirement.length != 0) {
      response.featureList = estHeaderRequirement
    }

    let requirementType = await RequirementType.find({});
    if (requirementType.length != 0) {
      response.requirementType = requirementType
    }

     let requirementTag = await RequirementTag.find({});
    if (requirementTag.length != 0) {
      response.requirementTag = requirementTag
    }
    let estimationHeaderAtrributeModel = await EstimationHeaderAtrributeModel.find(
      {
        estHeaderId: id
      }).populate({
        path: 'estAttributeId',
      })
    
    response.estHeaderAttribute = [];
    if (estimationHeaderAtrributeModel.length != 0) {
      estimationHeaderAtrributeModel.forEach(element => {
        response.estHeaderAttribute.push({
          field: element.estAttributeId.attributeCode,
          description: element.estAttributeId.description,
          title:element.estAttributeId.attributeName,
          id: element.estAttributeId._id,
          type: "numeric",
        });
      });

    }
    return formatMongoData(response)
  } catch (err) {
    console.log("something went wrong: service > createEstimation Header", err);
    throw new Error(err)
  }
}
