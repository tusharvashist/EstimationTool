const constant = require("../constant");
const resourceRoleMasterModel = require("../database/models/resourceRoleMaster");
const estResourcePlanningModel = require("../database/models/estResourcePlanning");
const EstimationHeader = require("../database/models/estHeaderModel");
const EstResourceCount = require("../database/models/estResourceCount");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

module.exports.createResourceRoleMaster = async (serviceData) => {
  try {
    let roleMaster = new resourceRoleMasterModel({ ...serviceData });

    let result = await roleMaster.save();
    return formatMongoData(result);
  } catch (err) {
    console.log(
      "something went wrong: service >resourceRole master Service ",
      err
    );
    throw new Error(err);
  }
};

module.exports.createEstResourcePlanning = async (serviceData) => {
  try {
    let estimationTemplate = new estResourcePlanningModel({ ...serviceData });
    let result = await estimationTemplate.save();

    return formatMongoData(result);
  } catch (err) {
    console.log(
      "something went wrong: service est resource planning service ",
      err
    );
    throw new Error(err);
  }
};

module.exports.getAllResources = async ({ resourceCountId }) => {
  try {
    let planResource = await estResourcePlanningModel.aggregate([
      {
        $match: {
          estResourceCountID: mongoose.Types.ObjectId(resourceCountId),
        },
      },
      {
        $group: {
          _id: {
            resourceRoleID: "$resourceRoleID",
            defaultAdjusted: "$defaultAdjusted",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    let rescount = await EstResourceCount.findById(resourceCountId);
    let estheader = await EstimationHeader.findById(rescount.estHeaderId);
    // .locations;

    let masterResource = await resourceRoleMasterModel
      .aggregate([
        {
          $lookup: {
            from: "locationmasters",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
        {
          $unwind: {
            path: "$location",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "techskillmasters",
            localField: "techskill",
            foreignField: "_id",
            as: "techskill",
          },
        },
        {
          $unwind: {
            path: "$techskill",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            "techskill._id": rescount.techSkill,
          },
        },
      ])
      .addFields({ count: 0, defaultAdjusted: false });

    let filteredresource = masterResource.filter((resource) =>
      estheader.locations.some(
        (loc) => String(resource.location._id) === String(loc)
      )
    );

    filteredresource.forEach((element) => {
      let exists = planResource.filter(
        (x) => String(x._id.resourceRoleID) == String(element._id)
      );
      if (exists.length > 0) {
        element.defaultAdjusted = exists[0]._id.defaultAdjusted;
        element.count = exists[0].count;
      }
    });

    return filteredresource;
  } catch (err) {
    console.log(
      "something went wrong: service > resource RoleMasterService ",
      err
    );
    throw new Error(err);
  }
};

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
