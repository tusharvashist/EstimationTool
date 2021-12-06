const constant = require("../constant")
const resourceRoleMasterModel = require("../database/models/resourceRoleMaster")
const estResourcePlanningModel = require("../database/models/estResourcePlanning")
const { formatMongoData } = require("../helper/dbhelper")

module.exports.createResourceRoleMaster = async (serviceData) => {
  try {
    let roleMaster = new resourceRoleMasterModel({ ...serviceData })

    let result = await roleMaster.save();
    return formatMongoData(result)
  } catch (err) {
    console.log("something went wrong: service >resourceRole master Service ", err);
    throw new Error(err)
  }
}

module.exports.createEstResourcePlanning = async (serviceData) => {
  try {
    let estimationTemplate = new estResourcePlanningModel({ ...serviceData })
    let result = await estimationTemplate.save();

    return formatMongoData(result)
  } catch (err) {
    console.log("something went wrong: service est resource planning service ", err);
    throw new Error(err)
  }
}




module.exports.getAllResources = async () => {
  try {
    let planResource = await estResourcePlanningModel.aggregate([
      {
        $match: {
          estResourceCountID: "87"
        }
      },
      {
        $group: {
          _id: "$resourceRoleID",
          count: {
            $sum: 1
          }
        }
      },
      {
        $lookup: {

          from: 'resourceRoleMasters',
          localField: '_id',
          foreignField: '_id',
          as: 'resourceMasters'
        }
      }, {
        $unwind:
        {
          path: "$resourceMasters"

        }
      }
    ]);
    //let planResource1 = await estResourcePlanningModel.find({})
    console.log(planResource);

    let masterResource = await resourceRoleMasterModel.aggregate().addFields({ count: 0 });


    masterResource.forEach(element => {
      planResource.forEach(estSelAttElement => {
        if (estSelAttElement._id == element._id) {
          if (estSelAttElement.count > 0)
            element.count = estSelAttElement.count;
          element.defaultAdjusted = estSelAttElement.resourceRoleMasters.defaultAdjusted;
        }
      })
    });
    console.log(masterResource);
    console.log(planResource)
    return (masterResource);
  }
  catch (err) {
    console.log("something went wrong: service > resource RoleMasterService ", err);
    throw new Error(err)
  }
}



  //if (estResourceCountID) {
    // //TODO formulaTags and tag is to be populated in estAttCalc in find

  //   let estSelPlan = await estResourcePlanningModel();
  //   if(estSelPlan.defaultAdjusted){


  //   }

  //   planResource.forEach(element => {
  //     roleMaster.forEach(estSelAttElement => {
  //       if (String(element._id) == String(estSelAttElement._id)) {

  //         estSelPlan.cost = estSelAttElement.cost;
  //         estSelPlan.price = estSelAttElement.price;
  //         estSelPlan.defaultAdjusted = estSelAttElement.defaultAdjusted;
  //         estSelPlan.count= element.cost


  //       }

  //     });
  //   });
  //   return estSelPlan;


  // }
//}

// module.exports.getAllResources = async (estResourceCountID) => {
// let master= await resourceRoleMasterModel.aggregate([{
















//       if (resourceRoleID) {
//         //TODO formulaTags and tag is to be populated in estAttCalc in find

//         let estSelAtt = await EstimationTemplateCalcAttr.find({ estTypeId: esttype }).populate("tag").populate({
//             path: "formulaTags"
//         });

//         var index = 0;
//         estAttCalc.forEach(element => {
//             estSelAtt.forEach(estSelAttElement => {
//                 if (String(estSelAttElement.estCalcId) == String(element._id)) {
//                     element.selected = true;
//                 }
//             });
//         });

//     {
//       $match: {
//         estTypeId:  ObjectId(esttype)
//       }
//     }, {
//       $lookup: {
//         from: 'requirementtags', 
//         localField: 'tag', 
//         foreignField: '_id', 
//         as: 'tag'
//       }
//     }, {
//       $unwind: {
//         path: '$tag', 
//         preserveNullAndEmptyArrays: true
//       }
//     }, 

//     //====
//     $group :
//         {
//           _id : "$item",
//           totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } }
//         }




//         let estSelAtt = await EstimationHeaderTemplateCalcAttr.find({ estHeaderId: ObjectId(estheaderid) }).populate("tag").populate({
//           path: 'formulaTags'
//       });

//       var index = 0;
//       estAttCalc.forEach(element => {
//           estSelAtt.forEach(estSelAttElement => {
//               if (String(estSelAttElement.calcAttributeName) == String(element.calcAttributeName)) {
//                   element.selected = true;
//                   element.isFormula = estSelAttElement.isFormula;
//                   element.formula = estSelAttElement.formula;
//                   element.tag = estSelAttElement.tag;
//                   element.calcType = estSelAttElement.calcType;
//                   element.formulaTags = estSelAttElement.formulaTags;
//                   element.operator = estSelAttElement.operator;
//                   element.unit = estSelAttElement.unit;
//                   element.description = estSelAttElement.description;
//                   element.value == estSelAttElement.value;
//               }

//           });
//       });




// .find({ resourceRole: ObjectId(resourceRole) })
// let planResource = await estResourcePlanningModel.find({ resourceCountID: ObjectId(estResourceCountID) })
// estAttCalc.forEach(element => {
//     estSelAtt.forEach(estSelAttElement => {
//         if (String(estSelAttElement.calcAttributeName) == String(element.calcAttributeName)) {
//             element.selected = true;
//             element.isFormula = estSelAttElement.isFormula;
//             element.formula = estSelAttElement.formula;
//             element.tag = estSelAttElement.tag;
//             element.calcType = estSelAttElement.calcType;


//     try {
//         let estAttCalc = await EstimationCalcAttr.aggregate([
//             {
//               $match: {
//                 estTypeId:  ObjectId(esttype)
//               }
//             }, {
//               $lookup: {
//                 from: 'requirementtags', 
//                 localField: 'tag', 
//                 foreignField: '_id', 
//                 as: 'tag'
//               }
//             }, {
//               $unwind: {
//                 path: '$tag', 
//                 preserveNullAndEmptyArrays: true
//               }
//             }, {
//               $lookup: {
//                 from: 'requirementtags', 
//                 localField: 'formulaTags', 
//                 foreignField: '_id', 
//                 as: 'formulaTags'
//               }
//             }
//           ]).addFields({ selected: false, value: "" });
//         if (estheaderid) {
//             // //TODO formulaTags and tag is to be populated in estAttCalc in find

//             let estSelAtt = await estResourcePlanningModel.find({ estHeaderId: ObjectId(estheaderid) }).populate("tag").populate({
//                 path: 'formulaTags'
//             });

//             var index = 0;
//             estAttCalc.forEach(element => {
//                 estSelAtt.forEach(estSelAttElement => {
//                     if (String(estSelAttElement.calcAttributeName) == String(element.calcAttributeName)) {
//                         element.selected = true;
//                         element.isFormula = estSelAttElement.isFormula;
//                         element.formula = estSelAttElement.formula;
//                         element.tag = estSelAttElement.tag;
//                         element.calcType = estSelAttElement.calcType;
//                         element.formulaTags = estSelAttElement.formulaTags;
//                         element.operator = estSelAttElement.operator;
//                         element.unit = estSelAttElement.unit;
//                         element.description = estSelAttElement.description;
//                         element.value == estSelAttElement.value;
//                     }

//                 });
//             });

//         }

//         if (esttype) {
//             //TODO formulaTags and tag is to be populated in estAttCalc in find

//             let estSelAtt = await EstimationTemplateCalcAttr.find({ estTypeId: esttype }).populate("tag").populate({
//                 path: "formulaTags"
//             });

//             var index = 0;
//             estAttCalc.forEach(element => {
//                 estSelAtt.forEach(estSelAttElement => {
//                     if (String(estSelAttElement.estCalcId) == String(element._id)) {
//                         element.selected = true;
//                     }
//                 });
//             });

//             return (estAttCalc)
//         }
//     } catch (err) {
//         console.log("something went wrong: service > estimationTemplateCalcAttrService ", err);
//         throw new Error(err)
//     }
// }


// const estResourcePlanning = new mongoose.Schema(
//     {
//       estResourceCountID: {
//         type: Schema.Types.ObjectId,
//         ref: "EstResourceCount",
//       },
//       resourceRoleID: {
//         type: Schema.Types.ObjectId,
//         ref: "resourceRoleMaster",
//       },
//       cost: Number,
//       currency: String,
//       price: Number,
//       allocationPercent: Number,
//       defaultAdjusted: Boolean
//     },

//     resourceRoleMaster
//     resourceRole: String,
//     cost: Number,
//     price: Number,
//     techSkill: String,
//     location: String,
//     isDeleted: Boolean,
//     defaultAdjusted: Boolean

// master me se 2 extra 
// count extra 
// default i need from planning if we hacve from planning 
