const constant = require("../constant")
const {ObjectId} = require('mongodb');
const EstimationCalcAttr = require("../database/models/estimationCalcAttrModel")
const Client = require("../database/models/clientModel")
const EstHeaderModel = require("../database/models/estHeaderModel")
const ProjectRequirement = require("../database/models/projectRequirement")
const QueryAssumptionModel = require("../database/models/queryAssumptionModel")
const EstHeaderRequirement = require("../database/models/estHeaderRequirement")
const EstRequirementData =  require("../database/models/estRequirementData")
const { formatMongoData } = require("../helper/dbhelper")
const RequirementType = require("../database/models/requirementType")
const RequirementTag = require("../database/models/requirementTag")
const EstimationHeaderAttributeModel = require("../database/models/estimationHeaderAtrributeModel")
const EstimationHeaderAttributeCalc = require("../database/models/estimationHeaderAtrributeCalcModel")
const EstimationAttributes = require("../database/models/estimationAttributesModel")
const mongoose = require("mongoose")


module.exports.createRequirement = async (serviceData) => {
    let projectRequirement = new ProjectRequirement({ ...serviceData })
    let requirementId = '';
    const findRecord = await ProjectRequirement.find(
        { title: projectRequirement.title },
        { project: projectRequirement.project }
    );

    if(findRecord.length != 0){
        return findRecord[0];
    } else {
      let result = await projectRequirement.save();
        return result;
    }
    
}


module.exports.mapHeaderRequirement = async (requirementId, serviceData) => {

    const estHeaderModel = await EstHeaderModel.findById({ _id: serviceData.estHeader })
    if (estHeaderModel.length == 0) {
       throw new Error(constant.requirementMessage.INVALID_EST_ID);
    }

    const record = await EstHeaderRequirement.find({requirement: requirementId ,estHeader: mongoose.Types.ObjectId(serviceData.estHeader)})
    if(record.length != 0){
        throw new Error(constant.requirementMessage.DUPLICATE_REQUIREMENT);
    }
    
    let estHeaderRequirement = new EstHeaderRequirement({requirement: requirementId ,estHeader: estHeaderModel._id ,isDeleted: false})
    let result_estHeaderRequirement = await estHeaderRequirement.save();
    
    return result_estHeaderRequirement

}

module.exports.createQueryAssumption = async (projectRequirementId, serviceData) => {
    const findRecord = await QueryAssumptionModel.find(
        { projectRequirement: projectRequirementId },
        { query: serviceData.query }
    );
    if (findRecord.length == 0) {
        let queryAssumptionModel = new QueryAssumptionModel({ ...serviceData });
        queryAssumptionModel.projectRequirement = projectRequirementId;
        let result = await queryAssumptionModel.save();
        return result;
    } else {
        return findRecord[0];
    }
}


module.exports.getTags = async () => {
     let requirementTag = await RequirementTag.find({}).sort({ name: 1 });
    if (requirementTag.length != 0) {
     return requirementTag;
    } else {
        return [];
    }

}

module.exports.getTypes = async () => {
    let requirementType = await RequirementType.find({}).sort({ name: 1 });
    if (requirementType.length != 0) {
        return requirementType;
    } else {
        return [];
    }


}