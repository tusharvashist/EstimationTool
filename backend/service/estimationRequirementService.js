
const constant = require("../constant")
const {ObjectId} = require('mongodb');
const EstimationCalcAttr = require("../database/models/estimationCalcAttrModel")
const Client = require("../database/models/clientModel")
const EstHeaderModel = require("../database/models/estHeaderModel")
const ProjectRequirement = require("../database/models/projectRequirement")
const EstHeaderRequirement = require("../database/models/estHeaderRequirement")
const EstRequirementData =  require("../database/models/estRequirementData")
const { formatMongoData } = require("../helper/dbhelper")
const RequirementType = require("../database/models/requirementType")
const RequirementTag = require("../database/models/requirementTag")
const EstimationHeaderAttributeModel = require("../database/models/estimationHeaderAtrributeModel")
const EstimationHeaderAttributeCalc = require("../database/models/estimationHeaderAtrributeCalcModel")
const EstimationAttributes = require("../database/models/estimationAttributesModel")
const mongoose = require("mongoose")


module.exports.create = async (serviceData) => {
  try {
    let projectRequirement = new ProjectRequirement({ ...serviceData })
    let requirementId = '';
    const findRecord = await ProjectRequirement.find({ title: projectRequirement.title }, { project: projectRequirement.project });
    if(findRecord.length != 0){
      requirementId = findRecord[0]._id;    
      }else {
      let result = await projectRequirement.save();
      requirementId = result._id;
    }

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
    
    return formatMongoData(result_estHeaderRequirement)

  } catch (err) {
    //console.log("something went wrong: service > Requirment ", err);
    throw new Error(err)
  }
}


module.exports.updateRequirement = async ({ id, updateInfo }) => {
  try {
    const findRecord = await ProjectRequirement.find({ title: updateInfo.title }, { project: updateInfo.project });
    if (findRecord.length != 0) {
      if (findRecord.length == 1 && String(findRecord[0]._id) == id) {
        let requirement = await ProjectRequirement.findOneAndUpdate({ _id: id }, updateInfo, { new: true });
       if (!requirement) {
         throw new Error(constant.requirementMessage.REQUIREMENT_NOT_FOUND)
       }
       return formatMongoData(requirement)
      } else {
        throw new Error(constant.requirementMessage.DUPLICATE_REQUIREMENT);
      }
    } else {
      let requirement = await ProjectRequirement.findOneAndUpdate({ _id: id }, updateInfo, { new: true });
       if (!requirement) {
         throw new Error(constant.requirementMessage.REQUIREMENT_NOT_FOUND)
       }
      return formatMongoData(requirement)
      
        
      }

  } catch (err) {
    //console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}

module.exports.updateRequirementData = async (serviceDataArray) => {
  try {
    console.log("Update Starts");
    var length = 0;
   var bulk =  EstRequirementData.collection.initializeUnorderedBulkOp();
    serviceDataArray.data.forEach(async (serviceData) => {
      let estRequirementData = new EstRequirementData({ ...serviceData })
      let result =  bulk.find({
        ESTAttributeID: estRequirementData.ESTAttributeID,
        ESTHeaderRequirementID: estRequirementData.ESTHeaderRequirementID
        }).upsert().updateOne(
          {
            $set: {
              ESTAttributeID: estRequirementData.ESTAttributeID,
              ESTHeaderRequirementID: estRequirementData.ESTHeaderRequirementID,
              ESTData: estRequirementData.ESTData
            }
          },
        { upsert: true , new: true }
        );
    });

    const result = await bulk.execute();
    console.log("Update End");
   
    
  } catch (err) {
   // console.log("something went wrong: service > RequirmentData ", err);
    throw new Error(err)
  }
}

module.exports.deleteRequirementData = async (id) => {
  try {
    let estHeaderRequirement = await EstHeaderRequirement.findByIdAndRemove({_id:id});
    if (!estHeaderRequirement) {
      throw new Error(constant.requirementMessage.REQUIREMENT_NOT_FOUND)
    }
    return formatMongoData(estHeaderRequirement)
  } catch (err) {
   // console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}

class sumOfKey extends Array {
    sum(key) {
        return this.reduce((a, b) => a + (b[key] || 0), 0);
    }
}

// module.exports.getById = async ({ id }) => {
//   try {
//        console.log("GetByID Starts");
//     if (!mongoose.Types.ObjectId(id)) {
//       throw new Error(constant.requirementMessage.INVALID_ID)
//     }

//     let response = { ...constant.requirementResponse };
  
// //****************** */
//     // let estHeaderRequirement2 = await EstHeaderRequirement
//     //   .find({ estHeader: id, isDeleted: false }, { estHeader: 0 })
//     //   .populate({
//     //     path: 'requirement',
//     //     populate: [{ path: 'tag' }, { path: 'type' }],
//     //   }).populate({
//     //     path: 'estRequirementData',
//     //      populate: { path: 'ESTAttributeID' }
//     //   })
    
// //****************** */   
    
    
//     let estHeaderRequirement = await EstHeaderRequirement.aggregate([
//       {
//         $match: {
//           estHeader: ObjectId(id),
//           isDeleted: false
//        }
//       },
//       {
//         $lookup: {
//           from: 'estrequirementdatas',
//           localField: '_id',
//           foreignField: 'ESTHeaderRequirementID',
//           as: 'attributeData'
//         }
//       },
//       {
//         $lookup: {
//           from: 'projectrequirements',
//           localField: 'requirement',
//           foreignField: '_id',
//           as: 'requirementData'
//         }
//       },
//       {
//         $unwind: {
//           path: '$requirementData',
//           preserveNullAndEmptyArrays: true
//         }
//       },
//       {
//         $lookup: {
//           from: 'requirementtypes',
//           localField: 'requirementData.type',
//           foreignField: '_id',
//           as: 'requirementData.type'
//         }
//       },
//       {
//         $unwind: {
//           path: '$requirementData.type',
//           preserveNullAndEmptyArrays: true
//         }
//       },
//       {
//         $lookup: {
//           from: 'requirementtags',
//           localField: 'requirementData.tag',
//           foreignField: '_id',
//           as: 'requirementData.tag'
//         }
//       },
//       {
//         $unwind: {
//           path: '$requirementData.tag',
//           preserveNullAndEmptyArrays: true
//         }
//       },
//       {
//         $unwind: {
//           path: '$attributeData',
//           preserveNullAndEmptyArrays: true
//         }
//       },
//       {
//         $lookup: {
//           from: 'estimationattributes',
//           localField: 'attributeData.ESTAttributeID',
//           foreignField: '_id',
//           as: 'attributeData.ESTAttributeID'
//         }
//       },
//       {
//         $unwind: {
//           path: '$attributeData.ESTAttributeID',
//           preserveNullAndEmptyArrays: true
//         }
//       },
//       {
//         $group: {
//           _id: '$_id',
//           isDeleted: {
//           $first: '$isDeleted'
//       },
//     requirement: {
//         $first: '$requirementData'
//       },
//       estHeader: {
//          $first: '$estHeader'
//       },
//      estRequirementData: {
//          $push: '$attributeData'
//         }
//         }
//       },
//       {
//         $project: {
//         _id: 1,
//         isDeleted: 1,
//         estRequirementData: 1,
//         requirement: 1
//         }
//       }
//     ]
//     );
   
    
//     if (estHeaderRequirement.length != 0) {
//       response.featureList = estHeaderRequirement
//     }

//     var summaryTagList = [];
//     var GrandTotal = 0;
//     var DevTotal = 0;

//     estHeaderRequirement.forEach(element => {
//       if(element.isDeleted == false){
     
        
//         element.estRequirementData = element.estRequirementData.filter(function (item, pos) {
//            return element.estRequirementData.indexOf(item) == pos;
//         })
//         var totalEffortOfElement = 0;
        
//         element.estRequirementData.forEach(effort => {
//           if (typeof effort.ESTData === 'number') {
//               totalEffortOfElement = totalEffortOfElement + effort.ESTData;
//           }
//         })
        
//         // const ESTData = new sumOfKey(element.estRequirementData);
//         // totalEffortOfElement = totalEffortOfElement + ESTData.sum('ESTData')
        
//        DevTotal = DevTotal + totalEffortOfElement;
        
//       if (DevTotal) {
//         if (summaryTagList.length == 0) {
//           summaryTagList.push({
//             Title: element.requirement.tag.name,
//             Effort: totalEffortOfElement,
//             id: element.requirement.tag._id
//           });

//         } else {
//           var tagName = element.requirement.tag.name;
//           // var index = summaryTagList.findIndex(function (summaryTag, index) {
//           //   if (summaryTag.id == element.requirement.tag.id)
//           //     return true;
//           // });

//           var index = -1;
//           var currentIndex= 0
//            summaryTagList.forEach(effort => {
//           if (effort.Title === tagName) {
//               index = currentIndex
//           }
//              currentIndex = currentIndex + 1;
//         })
        
//           if (index >= 0) {
//             summaryTagList[index].Effort = summaryTagList[index].Effort + totalEffortOfElement
//           } else {
//             summaryTagList.push({
//               Title: element.requirement.tag.name,
//               Effort: totalEffortOfElement,
//               id: element.requirement.tag._id
//             });
//           }
//         }
//         }
//       }
//     });


//     var calAttributeTotal = 0;
//     let estHeaderAttributeCalc = await EstimationHeaderAttributeCalc.find({ estHeaderId: id });
   




//     if (estHeaderAttributeCalc.length != 0) {

//         estHeaderAttributeCalc = estHeaderAttributeCalc.filter(function(item, pos) {
//     return estHeaderAttributeCalc.indexOf(item) == pos;
//         })
      
//       estHeaderAttributeCalc.forEach(element => {
//         var effort = DevTotal * (element.unit / 100);
//          effort = Math.round(effort);
//         calAttributeTotal = calAttributeTotal + effort;
       
//         var formula = element.calcAttributeName + " @" +element.unit +"% All " 
        
//          summaryTagList.push({
//           Title: formula,
//           Effort: effort,
//           id: element._id
//         });
//       });
//     }

//     GrandTotal = DevTotal + calAttributeTotal; 
//     GrandTotal =  Math.round(GrandTotal);
 
//  var arrayRequirement = [];
//     response.featureList.forEach((item, i) => {
//       if (item.isDeleted === false) {
//         var field = item.requirement.title;
//         var requirement = {
//           Requirement: item.requirement.title,
//           Description: item.requirement.description,
//           Tag: item.requirement.tag.name,
//           Tagid: item.requirement.tag._id,
//           Type: item.requirement.type,
//           requirementId: item.requirement._id,
//           _id: item._id,
//         };
//         item.estRequirementData.forEach((item, i) => {

//             if (item.ESTData !== undefined) {
//               requirement[item.ESTAttributeID._id] = item.ESTData;
//             }
//         });
//         arrayRequirement.push(requirement);
//       }
//     });
//     response.requirementList = arrayRequirement;
// //1
//  let estHeaderModelTotal = await EstHeaderModel.updateOne({_id:id}, { totalCost: GrandTotal });
//     if (!estHeaderModelTotal) {
//      // throw new Error(constant.requirementMessage.REQUIREMENT_NOT_FOUND)
//     }
//     summaryTagList.push({
//           Title: "Estimation Total",
//           Effort: GrandTotal,
//           id: 0
//         });
//    summaryTagList = summaryTagList.filter(function(item, pos) {
//     return summaryTagList.indexOf(item) == pos;
//         })
//     response.summaryTagList = summaryTagList;

//     console.log(response.summaryTagList);

// //4
//     let estimationHeaderAttributeModel = await EstimationHeaderAttributeModel.find(
//       {
//         estHeaderId: id
//       },{ isDeleted: false }).populate({
//         path: 'estAttributeId',
//       })
    
//     response.estHeaderAttribute = [];
//     if (estimationHeaderAttributeModel.length != 0) {
//       estimationHeaderAttributeModel.forEach(element => {
//         if (element.estAttributeId) {
//           response.estHeaderAttribute.push({
//             field: element.estAttributeId._id,
//             description: element.estAttributeId.description,
//             title: element.estAttributeId.attributeName,
//             id: element.estAttributeId._id,
//             code: element.estAttributeId.attributeCode,
//             type: "numeric",
            
//           });
//         }
//       });
//     }

    
    
//     //2
//     let requirementType = await RequirementType.find({}).sort({name : 1});
//     if (requirementType.length != 0) {
//       response.requirementType = requirementType
//     }
// //3
//      let requirementTag = await RequirementTag.find({}).sort({name : 1});
//     if (requirementTag.length != 0) {
//       response.requirementTag = requirementTag
//     }

//     //5
//     let estimations = await EstHeaderModel.findById({ _id: id }).
//       populate({
//         path: 'projectId',
//         populate: { path: 'client' }
//       }).populate({
//         path: 'estTypeId'
//       });
    
//     response.basicDetails = estimations;
//  console.log("GetByID Ends");
//     return formatMongoData(response)
//   } catch (err) {
//     console.log("something went wrong: service > GetEstimation data", err);
//     throw new Error(err)
//   }
// }

module.exports.getById = async ({ id }) => {
  try {
    console.log("GetByID Starts");
    
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.requirementMessage.INVALID_ID)
    }

    let response = { ...constant.requirementResponse };    
    //2
    let requirementType = await RequirementType.find({}).sort({name : 1});
    if (requirementType.length != 0) {
      response.requirementType = requirementType
    }
//3
     let requirementTag = await RequirementTag.find({}).sort({name : 1});
    if (requirementTag.length != 0) {
      response.requirementTag = requirementTag
    }

    //5
    let estimations = await EstHeaderModel.findById({ _id: id }).
      populate({
        path: 'projectId',
        populate: { path: 'client' }
      }).populate({
        path: 'estTypeId'
      });
    
    response.basicDetails = estimations;
 console.log("GetByID Ends");
    return formatMongoData(response)
  } catch (err) {
    console.log("something went wrong: service > GetEstimation data", err);
    throw new Error(err)
  }
}




module.exports.getRequirementData = async ({ id }) => {
  try {
       console.log("GetByID Starts");
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.requirementMessage.INVALID_ID)
    }

    let response = { ...constant.requirementResponse };

    let estHeaderRequirement = await EstHeaderRequirement.aggregate([
      {
        $match: {
          estHeader: ObjectId(id),
          isDeleted: false
       }
      },
      {
        $lookup: {
          from: 'estrequirementdatas',
          localField: '_id',
          foreignField: 'ESTHeaderRequirementID',
          as: 'attributeData'
        }
      },
      {
        $lookup: {
          from: 'projectrequirements',
          localField: 'requirement',
          foreignField: '_id',
          as: 'requirementData'
        }
      },
      {
        $unwind: {
          path: '$requirementData',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'requirementtypes',
          localField: 'requirementData.type',
          foreignField: '_id',
          as: 'requirementData.type'
        }
      },
      {
        $unwind: {
          path: '$requirementData.type',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'requirementtags',
          localField: 'requirementData.tag',
          foreignField: '_id',
          as: 'requirementData.tag'
        }
      },
      {
        $unwind: {
          path: '$requirementData.tag',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: '$attributeData',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'estimationattributes',
          localField: 'attributeData.ESTAttributeID',
          foreignField: '_id',
          as: 'attributeData.ESTAttributeID'
        }
      },
      {
        $unwind: {
          path: '$attributeData.ESTAttributeID',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          isDeleted: {
          $first: '$isDeleted'
      },
    requirement: {
        $first: '$requirementData'
      },
      estHeader: {
         $first: '$estHeader'
      },
     estRequirementData: {
         $push: '$attributeData'
        }
        }
      },
      {
        $project: {
        _id: 1,
        isDeleted: 1,
        estRequirementData: 1,
        requirement: 1
        }
      },
      {
        $sort: {
          'requirement.title': 1
        }
    }
    ]
    );
   
    
    if (estHeaderRequirement.length != 0) {
      response.featureList = estHeaderRequirement
    }

    var summaryTagList = [];
    var GrandTotal = 0;
    var DevTotal = 0;

    estHeaderRequirement.forEach(element => {
      if(element.isDeleted == false){
     
        
        element.estRequirementData = element.estRequirementData.filter(function (item, pos) {
           return element.estRequirementData.indexOf(item) == pos;
        })
        var totalEffortOfElement = 0;
        
        element.estRequirementData.forEach(effort => {
          if (typeof effort.ESTData === 'number') {
              totalEffortOfElement = totalEffortOfElement + effort.ESTData;
          }
        })
        

       DevTotal = DevTotal + totalEffortOfElement;
        
      if (DevTotal) {
        if (summaryTagList.length == 0) {
          summaryTagList.push({
            Title: element.requirement.tag.name,
            Effort: totalEffortOfElement,
            id: element.requirement.tag._id
          });

        } else {
          var tagName = element.requirement.tag.name;
          var index = -1;
          var currentIndex= 0
           summaryTagList.forEach(effort => {
          if (effort.Title === tagName) {
              index = currentIndex
          }
             currentIndex = currentIndex + 1;
        })
        
          if (index >= 0) {
            summaryTagList[index].Effort = summaryTagList[index].Effort + totalEffortOfElement
          } else {
            summaryTagList.push({
              Title: element.requirement.tag.name,
              Effort: totalEffortOfElement,
              id: element.requirement.tag._id
            });
          }
        }
        }
      }
    });

    var calAttributeTotal = 0;
    let estHeaderAttributeCalc = await EstimationHeaderAttributeCalc.find({ estHeaderId: id });
   
    if (estHeaderAttributeCalc.length != 0) {

        estHeaderAttributeCalc = estHeaderAttributeCalc.filter(function(item, pos) {
    return estHeaderAttributeCalc.indexOf(item) == pos;
        })
      
      estHeaderAttributeCalc.forEach(element => {
        var effort = DevTotal * (element.unit / 100);
         effort = Math.round(effort);
        calAttributeTotal = calAttributeTotal + effort;
       
        var formula = element.calcAttributeName + " @" +element.unit +"% All " 
        
         summaryTagList.push({
          Title: formula,
          Effort: effort,
          id: element._id
        });
      });
    }

    GrandTotal = DevTotal + calAttributeTotal; 
    GrandTotal =  Math.round(GrandTotal);
 
 var arrayRequirement = [];
    response.featureList.forEach((item, i) => {
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
        };
        item.estRequirementData.forEach((item, i) => {

            if (item.ESTData !== undefined) {
              requirement[item.ESTAttributeID._id] = item.ESTData;
            }
        });
        arrayRequirement.push(requirement);
      }
    });
    response.requirementList = arrayRequirement;
//1
 let estHeaderModelTotal = await EstHeaderModel.updateOne({_id:id}, { totalCost: GrandTotal });
    if (!estHeaderModelTotal) {
     // throw new Error(constant.requirementMessage.REQUIREMENT_NOT_FOUND)
    }
    summaryTagList.push({
          Title: "Estimation Total",
          Effort: GrandTotal,
          id: 0
        });
   summaryTagList = summaryTagList.filter(function(item, pos) {
    return summaryTagList.indexOf(item) == pos;
        })
    response.summaryTagList = summaryTagList;

    console.log(response.summaryTagList);

//4
    let estimationHeaderAttributeModel = await EstimationHeaderAttributeModel.find(
      {
        estHeaderId: id
      },{ isDeleted: false }).populate({
        path: 'estAttributeId',
      })
    
    response.estHeaderAttribute = [];
    if (estimationHeaderAttributeModel.length != 0) {
      estimationHeaderAttributeModel.forEach(element => {
        if (element.estAttributeId) {
          response.estHeaderAttribute.push({
            field: element.estAttributeId._id,
            description: element.estAttributeId.description,
            title: element.estAttributeId.attributeName,
            id: element.estAttributeId._id,
            code: element.estAttributeId.attributeCode,
            type: "numeric",
            
          });
        }
      });
    }

    
    
//     //2
//     let requirementType = await RequirementType.find({}).sort({name : 1});
//     if (requirementType.length != 0) {
//       response.requirementType = requirementType
//     }
// //3
//      let requirementTag = await RequirementTag.find({}).sort({name : 1});
//     if (requirementTag.length != 0) {
//       response.requirementTag = requirementTag
//     }

//     //5
//     let estimations = await EstHeaderModel.findById({ _id: id }).
//       populate({
//         path: 'projectId',
//         populate: { path: 'client' }
//       }).populate({
//         path: 'estTypeId'
//       });
    
//     response.basicDetails = estimations;
 console.log("GetByID Ends");
    return formatMongoData(response)
  } catch (err) {
    console.log("something went wrong: service > GetEstimation data", err);
    throw new Error(err)
  }
}
