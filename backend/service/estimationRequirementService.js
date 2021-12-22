const constant = require("../constant")
const {ObjectId} = require('mongodb');
const EstHeaderModel = require("../database/models/estHeaderModel")
const ProjectRequirement = require("../database/models/projectRequirement")
const EstHeaderRequirement = require("../database/models/estHeaderRequirement")
const EstRequirementData =  require("../database/models/estRequirementData")
const { formatMongoData } = require("../helper/dbhelper")
const EstimationHeaderAttributeModel = require("../database/models/estimationHeaderAtrributeModel")
const mongoose = require("mongoose")
const RequirementRepository = require("../repository/requirementRepository")

const EstimationHeaderAttributeCalc = require("../database/models/estimationHeaderAtrributeCalcModel");

module.exports.create = async (serviceData) => {
  try {

    let requirement = await RequirementRepository.createRequirement(serviceData);
    let queryAssumption = await RequirementRepository.createQueryAssumption(requirement._id,serviceData);
    if (serviceData.estHeader.length != 0) {
      return formatMongoData( await RequirementRepository.mapHeaderRequirement(requirement._id, serviceData));
    }
    return formatMongoData(requirement)
  } catch (err) {
    throw new Error(err)
  }
};

module.exports.mapHeaderToMultipleRequirement = async ( serviceData) => {
  try {

    var result = await RequirementRepository.mapHeaderToMultipleRequirement(
        serviceData.id,
        serviceData.updateInfo.data)
    return formatMongoData(result );
 
  } catch (err) {
    // //console.log("something went wrong: service > RequirmentData ", err);
    throw new Error(err);
  }
};

module.exports.getRequirementWithQuery = async ({ id }) => {
  try {

    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.requirementMessage.INVALID_ID);
    }

    var requirementList = await RequirementRepository.getRequirementWithQuery(id);
    let response = { ...constant.requirementResponse };
    response.featureList = requirementList;

    return formatMongoData(response);
  } catch (err) {
    //console.log("something went wrong: service > GetEstimation data", err);
    throw new Error(err);
  }
};

module.exports.getUnpairedRequirementEstimation = async ( query) => {
  try {

    // if (!mongoose.Types.ObjectId(id)) {
    //   throw new Error(constant.requirementMessage.INVALID_ID);
    // }
  var requirementList = await RequirementRepository.getRequirementWithQuery(query.projectId);
    var unpairedRequirementEstimation = await RequirementRepository.getUnpairedRequirementEstimation(requirementList,
      query.estHeader);
   let response = { ...constant.requirementResponse };
    response.featureList = unpairedRequirementEstimation;

    return formatMongoData(response);
  } catch (err) {
    //console.log("something went wrong: service > GetEstimation data", err);
    throw new Error(err);
  }
};
/*
 var bulk = EstRequirementData.collection.initializeUnorderedBulkOp();
    serviceDataArray.data.forEach(async (serviceData) => {
      let estRequirementData = new EstRequirementData({ ...serviceData });
      let result = bulk
        .find({
          ESTAttributeID: estRequirementData.ESTAttributeID,
          ESTHeaderRequirementID: estRequirementData.ESTHeaderRequirementID,
        })
        .upsert()
        .updateOne(
          {
            $set: {
              ESTAttributeID: estRequirementData.ESTAttributeID,
              ESTHeaderRequirementID: estRequirementData.ESTHeaderRequirementID,
              ESTData: estRequirementData.ESTData,
            },
          },
          { upsert: true, new: true }
      );
      estHeader = serviceData.ESTHeaderID;
    });

    const result = await bulk.execute();
    if (estHeader.length !== 0) {
      //Update EstHeader for UpdatedBy
      const estHeaderModel = await EstHeaderModel.findById({
        _id: estHeader,
      });
      if (estHeaderModel.length == 0) {
        estHeaderModel.updatedBy = global.loginId;
        estHeaderModel.save();
      }
    }
     */

module.exports.updateManualCallAttribute = async ( id, updateInfo ) => {
  try {

    // if (!mongoose.Types.ObjectId(id)) {
    //   throw new Error(constant.requirementMessage.INVALID_ID);
    // }
    var bulk = EstimationHeaderAttributeCalc.collection.initializeUnorderedBulkOp();
    updateInfo.forEach(async (serviceData) => {
      let manualCallAttribute = new EstimationHeaderAttributeCalc({ ...serviceData });
      let result = bulk
        .find({
          _id: manualCallAttribute._id,
        })
        .upsert()
        .updateOne(
          {
            $set: {
              value: manualCallAttribute.value,
            },
          },
          {
            upsert: true,
            new: true
          });

        });


      const result = await bulk.execute();
  // let requirement = await EstimationHeaderAttributeCalc.findOneAndUpdate(
  //         { _id: id },
  //         updateInfo,
  //         { new: true }
  //       );
  //       if (!requirement) {
  //         throw new Error(constant.requirementMessage.REQUIREMENT_NOT_FOUND);
  //       }
    
    
    return formatMongoData(result);
    } catch (err) {
    ////console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
}

module.exports.updateRequirement = async ({ id, updateInfo }) => {
  try {
    const findRecord = await ProjectRequirement.find(
      { title: updateInfo.title },
      { project: updateInfo.project }
    );
    updateInfo.updatedBy = global.loginId;
    if (findRecord.length != 0) {
      if (findRecord.length == 1 && String(findRecord[0]._id) == id) {
        let requirement = await ProjectRequirement.findOneAndUpdate(
          { _id: id },
          updateInfo,
          { new: true }
        );
        if (!requirement) {
          throw new Error(constant.requirementMessage.REQUIREMENT_NOT_FOUND);
        }

      let queryAssumption = await RequirementRepository.updateQuery(requirement._id,updateInfo);
  
        
        return formatMongoData(requirement);
      } else {
        throw new Error(constant.requirementMessage.DUPLICATE_REQUIREMENT);
      }
    } else {
      let requirement = await ProjectRequirement.findOneAndUpdate(
        { _id: id },
        updateInfo,
        { new: true }
      );
      if (!requirement) {
        throw new Error(constant.requirementMessage.REQUIREMENT_NOT_FOUND);
      }
      return formatMongoData(requirement);
    }
  } catch (err) {
    ////console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};

module.exports.updateRequirementData = async (serviceDataArray) => {
  try {
    //console.log("Update Starts");
    var estHeader = "";
    var length = 0;
    var bulk = EstRequirementData.collection.initializeUnorderedBulkOp();
    serviceDataArray.data.forEach(async (serviceData) => {
      let estRequirementData = new EstRequirementData({ ...serviceData });
      let result = bulk
        .find({
          ESTAttributeID: estRequirementData.ESTAttributeID,
          ESTHeaderRequirementID: estRequirementData.ESTHeaderRequirementID,
        })
        .upsert()
        .updateOne(
          {
            $set: {
              ESTAttributeID: estRequirementData.ESTAttributeID,
              ESTHeaderRequirementID: estRequirementData.ESTHeaderRequirementID,
              ESTData: estRequirementData.ESTData,
            },
          },
          { upsert: true, new: true }
      );
      


      
      estHeader = serviceData.ESTHeaderID;


    });

    const result = await bulk.execute();
    if (estHeader.length !== 0) {
      //Update EstHeader for UpdatedBy
      const estHeaderModel = await EstHeaderModel.findById({
        _id: estHeader,
      });
      if (estHeaderModel.length == 0) {
        estHeaderModel.updatedBy = global.loginId;
        estHeaderModel.save();
      }
    }

    //console.log("Update End");
  } catch (err) {
    // //console.log("something went wrong: service > RequirmentData ", err);
    throw new Error(err);
  }
};

module.exports.deleteRequirementData = async (id) => {
  try {
    let estHeaderRequirement = await EstHeaderRequirement.findByIdAndRemove({
      _id: id,
    });
    if (!estHeaderRequirement) {
      throw new Error(constant.requirementMessage.REQUIREMENT_NOT_FOUND);
    }
    //Update EstHeader for UpdatedBy
    // const estHeaderModel = await EstHeaderModel.findById({
    //   _id: serviceData.estHeader,
    // });
    // estHeaderModel.updatedBy = global.loginId;
    // estHeaderModel.save();

    return formatMongoData(estHeaderRequirement);
  } catch (err) {
    // //console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};

class sumOfKey extends Array {
  sum(key) {
    return this.reduce((a, b) => a + (b[key] || 0), 0);
  }
}

module.exports.getById = async ({ id }) => {
  try {

    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.requirementMessage.INVALID_ID);
    }

    let response = { ...constant.requirementResponse };
    
    //2
      response.requirementType = await RequirementRepository.getTypes();
    //3
    response.requirementTag = await RequirementRepository.getTags();
    //5
    let estimations = await EstHeaderModel.findById({ _id: id })
      .populate({
        path: "projectId",
        populate: { path: "client" },
      })
      .populate({
        path: "estTypeId",
      });

    response.basicDetails = estimations;
    //console.log("GetByID Ends");
    return formatMongoData(response);
  } catch (err) {
    //console.log("something went wrong: service > GetEstimation data", err);
    throw new Error(err);
  }
};

module.exports.getRequirementData = async ({ id }) => {
  try {

    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.requirementMessage.INVALID_ID);
    }

    let response = { ...constant.requirementResponse };
    var contingency = await RequirementRepository.getContingency(id);

    //var callAttribute = await RequirementRepository.getAttributesCalAttributesTotal(id, contingency);
   // console.log("CallAttribute: ",callAttribute);
    var contingencySuffix = " Contingency";
    var estHeaderRequirement = await RequirementRepository.getEstHeaderRequirementWithContingency(id);
    if (estHeaderRequirement.length != 0) {
      response.featureList = estHeaderRequirement;
    }
    response.requirementList = await getRequirementList(estHeaderRequirement, contingency, contingencySuffix);
   
    // //1
    // let estHeaderModelTotal = await EstHeaderModel.updateOne(
    //   { _id: id },
    //   { totalCost: GrandTotal }
    // );
    // if (!estHeaderModelTotal) {
    //   // throw new Error(constant.requirementMessage.REQUIREMENT_NOT_FOUND)
    // }
   
    response.tagSummaryHeader = await getTagSummaryHeader(id);
    response.tagSummaryData = await RequirementRepository.tagWiseRequirementList(id, contingency, contingencySuffix);
    var tagTotal = response.tagSummaryData[response.tagSummaryData.length -1 ]; 
    console.log("tagTotal: ",tagTotal);
    response.summaryCalData = await RequirementRepository.getCalculativeAttributes(id, contingency, contingencySuffix);
      console.log("summaryCalData: ",response.summaryCalData);
  
    var projectTotal = {
      id: 1,
      calcType: 'percentage',
      calculative: 'Estimation Total',
      Effort: 0,
      Contingency: 0
    };


    if (tagTotal.total !== undefined && tagTotal.total_Contingency !== undefined) {
      projectTotal.Effort = tagTotal.total;
        projectTotal.Contingency = tagTotal.total_Contingency;
    }

    response.summaryCalData.forEach((item, i) => { 
      if (item.Effort  !== undefined && !isNaN(item.Contingency)) {
        projectTotal.Effort = item.Effort + projectTotal.Effort;//undifine
        projectTotal.Contingency = item.Contingency + projectTotal.Contingency;//nan
      }
    });

    response.summaryCalData.push(projectTotal); 

    

    var calculativeHeader = [
      {
        headerName: "Calculative",
        field: "calculative",
        editable: false,
        flex: 2,
        width: 500,
      },
      {
        headerName: "Total",
        field: "Effort",
        flex: 1,
        editable: true,
        width: 200
      },
    ];
      if (contingency > 0) { 
          calculativeHeader.push({
          headerName: "Contingency",
           field: "Contingency",
            editable: false,
           flex: 1,
            width: 200,
        });
      }
    response.summaryCallHeader = calculativeHeader;
    //4
    response.estHeaderAttribute = await getEstHeaderAttribute(id);
    return formatMongoData(response);
  } catch (err) {
    //console.log("something went wrong: service > GetEstimation data", err);
    throw new Error(err);
  }
};

async function getRequirementList(estHeaderRequirement ,contingency ,contingencySuffix) {
    var arrayRequirement = [];
    estHeaderRequirement.forEach((item, i) => {
      if (item.isDeleted === false) {
        var field = item.requirement.title;
        var requirement = {
          Requirement: item.requirement.title,
          Description: item.requirement.description,
          Tag: item.requirement.tag.name,
          Tagid: item.requirement.tag._id,
          Type: item.requirement.type,
          requirementId: item.requirement._id,
          _id: item._id,
          id: item._id,
          action: item._id,
        };

        if (item.requirement.queryassumptions.length !== 0) {
          requirement["queryassumptionsId"] = item.requirement.queryassumptions[0]._id;
          requirement["Query"] = item.requirement.queryassumptions[0].query;
          requirement["Assumption"] = item.requirement.queryassumptions[0].assumption;
          requirement["Reply"] = item.requirement.queryassumptions[0].reply;
        }
        item.estRequirementData.forEach((item, i) => {
          if (item.ESTData !== undefined && item.ESTData !==  null) {
             if (item.ESTAttributeID !== undefined && item.ESTAttributeID !==  null) {
            requirement[item.ESTAttributeID._id] = item.ESTData;
               if (contingency > 0) {
                 requirement[item.ESTAttributeID._id + contingencySuffix] = item.ESTDataContingency;
               }
             }
          }
        });
        arrayRequirement.push(requirement);
      }
    });
   
  return arrayRequirement;
}
function roundToTwo(value) {
  return value.toFixed(2);
}
async function getTagSummaryHeader( estHeaderId ) {

  var contingency = await RequirementRepository.getContingency(estHeaderId);
      var contingencySuffix = " Contingency";
  let estimationHeaderAttributeModel =
      await EstimationHeaderAttributeModel.find(
        {
          estHeaderId: estHeaderId,
        },
        { isDeleted: false }
      ).populate({
        path: "estAttributeId",
      });
  
    var estHeaderAttribute = [];
    
  
   estHeaderAttribute.push({
            field: "tag",
            description: "",
            headerName: "",
            id: 1,
            code:1,
            editable: false,
            width: 300 ,
          });
  
  
    if (estimationHeaderAttributeModel.length != 0) {
      estimationHeaderAttributeModel.forEach((element) => {
        if (element.estAttributeId) {
          estHeaderAttribute.push({
            field: element.estAttributeId._id,
            description: element.estAttributeId.description,
            headerName: element.estAttributeId.attributeName,
            id: element.estAttributeId._id,
            code: element.estAttributeId.attributeCode,
            type: "number",
            editable: false,
            width: 120 ,
          });

          if (contingency > 0) {
            estHeaderAttribute.push({
              field: element.estAttributeId._id + contingencySuffix,
              description: element.estAttributeId.description,
              headerName: element.estAttributeId.attributeName + contingencySuffix,
              id: element.estAttributeId._id + contingencySuffix,
              code: element.estAttributeId.attributeCode + contingencySuffix,
              type: "number",
              editable: false,
              width: 120, 
            });
          }
        }
      });

    }
  
     estHeaderAttribute.push({
            field: "total",
            description: "",
            headerName: "Total",
            id: 2,
            code:2,
            editable: false,
            width: 100 ,
     });
  
  if (contingency > 0) {
         estHeaderAttribute.push({
            field: "total_Contingency",
            description: "",
            headerName: "Total Contingency",
            id: 2,
            code:2,
            editable: false,
            width: 120 ,
     });
  }
  return estHeaderAttribute;
}

 
async function getEstHeaderAttribute( estHeaderId ) {

  var contingency = await RequirementRepository.getContingency(estHeaderId);
      var contingencySuffix = " Contingency";
  let estimationHeaderAttributeModel =
      await EstimationHeaderAttributeModel.find(
        {
          estHeaderId: estHeaderId,
        },
        { isDeleted: false }
      ).populate({
        path: "estAttributeId",
      });
  
    var estHeaderAttribute = [];
    
    if (estimationHeaderAttributeModel.length != 0) {
      estimationHeaderAttributeModel.forEach((element) => {
        if (element.estAttributeId) {
          estHeaderAttribute.push({
            field: element.estAttributeId._id,
            description: element.estAttributeId.description,
            headerName: element.estAttributeId.attributeName,
            id: element.estAttributeId._id,
            code: element.estAttributeId.attributeCode,
            type: "number",
            editable: true,
            width: 120 ,
          });

          if (contingency > 0) {
            estHeaderAttribute.push({
              field: element.estAttributeId._id + contingencySuffix,
              description: element.estAttributeId.description,
              headerName: element.estAttributeId.attributeName + contingencySuffix,
              id: element.estAttributeId._id + contingencySuffix,
              code: element.estAttributeId.attributeCode + contingencySuffix,
              type: "number",
              editable: false,
              width: 120, 
            });
          }
        }
      });
    }
  return estHeaderAttribute;
}