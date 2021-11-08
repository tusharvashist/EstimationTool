
const constant = require("../constant")
//const Estimation = require("../database/models/estimationModel")
const EstimationHeader = require("../database/models/estHeaderModel")
const EstimationTemplateModel = require("../database/models/estimationTemplateModel")
const ProjectModel = require("../database/models/projectModel")
const { formatMongoData } = require("../helper/dbhelper")
const mongoose = require("mongoose")
const EstimationHeaderAtrribute = require("../database/models/estimationHeaderAtrributeModel")
const EstimationHeaderAtrributeCalc = require("../database/models/estimationHeaderAtrributeCalcModel")
const EstimationHeaderAtrributeSchema = require("../database/models/estimationHeaderAtrributeModel")
const EstHeaderRequirement = require("../database/models/estHeaderRequirement")


// module.exports.createEstimation = async(serviceData)=>{
//   try{
//     let estimation = new Estimation({...serviceData})
//     let result =  await estimation.save();
//     return formatMongoData(result)
//   }catch(err){
//     console.log("something went wrong: service > createEstimation ", err);
//     throw new Error(err)
//   }
// }


// module.exports.getAllEstimation = async({skip = 0,limit = 10})=>{
//     try{
//       let estimations = await Estimation.find({}).skip(parseInt(skip)).limit(parseInt(limit));
//       return formatMongoData(estimations)
//     }catch(err){
//       console.log("something went wrong: service > createEstimation ", err);
//       throw new Error(err)
//     }
// }

// module.exports.getAllEstimationById = async({id})=>{
//     try{
//       if(!mongoose.Types.ObjectId(id)){
//         throw new Error(constant.estimationMessage.INVALID_ID)
//       }
//       let estimation = await Estimation.findById(id)
//       if(!estimation){
//           throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND)
//       }
//       return formatMongoData(estimation)
//     }catch(err){
//       console.log("something went wrong: service > createEstimation ", err);
//       throw new Error(err)
//     }
// }

// module.exports.estimationUpdate = async({id,updateInfo})=>{
//     try{

//       let estimation = await Estimation.findOneAndUpdate({_id:id},updateInfo,{new:true});
//       if(!estimation){
//           throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND)
//       }
//       return formatMongoData(estimation)
//     }catch(err){
//       console.log("something went wrong: service > createEstimation ", err);
//       throw new Error(err)
//     }
// }


module.exports.estimationDelete = async ({ id }) => {
  try {
    let estimation = await EstimationHeader.updateOne({ _id: id }, { isDeleted: true });

    if (!estimation) {
      throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND)
    }
    return formatMongoData(estimation)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}


module.exports.getRecentEstimation = async ({ skip = 0, limit = 10 }) => {
  try {
    let estimations = await EstimationHeader.find({}).
      populate({
        path: 'projectId',
        populate: { path: 'client' }
      }).populate({
        path: 'estTypeId'
      }).skip(parseInt(skip)).limit(parseInt(limit));
    return formatMongoData(estimations)
  } catch (err) {
    console.log("something went wrong: service > createEstimation Header", err);
    throw new Error(err)
  }
}


module.exports.getById = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.estimationMessage.INVALID_ID)
    }

    let estimations = await EstimationHeader.findById({ _id: id }).
      populate({
        path: 'projectId',
        populate: { path: 'client' }
      }).populate({
        path: 'estTypeId'
      });



    let responce = { ...constant.requirmentResponce };
    responce.basicDetails = estimations;

    let estHeaderRequirement = await EstHeaderRequirement.find({ estHeader: id }, { _id: 0, requirement: 1 }).populate({
      path: 'requirement'
    })
    if (estHeaderRequirement.length != 0) {
      responce.featureList = estHeaderRequirement
    }


    return formatMongoData(responce)
  } catch (err) {
    console.log("something went wrong: service > createEstimation Header", err);
    throw new Error(err)
  }
}

// create new estimation header configration
module.exports.createEstimationHeader = async (serviceData) => {
  try {
    let estimation = new EstimationHeader({ ...serviceData })

    let result = await estimation.save();

    const projectModel = await ProjectModel.findById({ _id: estimation.projectId })
    projectModel.estimates.push(estimation);
    await projectModel.save();


    return formatMongoData(result)
  } catch (err) {
    console.log("something went wrong: service > createEstimation Header ", err);
    throw new Error(err)
  }
}

// Update estimation header basic info 
module.exports.updateEstimationHeader = async ({ id, updatedInfo }) => {
  try {

    let estimation = await EstimationHeader.findOneAndUpdate({ _id: id }, updatedInfo, { new: true });
    if (!estimation) {
      throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND)
    }

    return formatMongoData(estimation)
  } catch (err) {
    console.log("something went wrong: service > Update Estimation Header ", err);
    throw new Error(err)
  }
}

//============================EstimationHeaderAtrribute=======================================================
module.exports.createEstimationHeaderAtrribute = async (serviceData) => {
  try {
    //Remove All Attributes from Estimation Header
    let estimationHeaderAtrributeCalc = new EstimationHeaderAtrribute({ serviceData })
    if (serviceData) {
      let resultdelete = await EstimationHeaderAtrribute.deleteMany({ estHeaderId: serviceData[0].estHeaderId });
      let result = await EstimationHeaderAtrribute.insertMany(serviceData, forceServerObjectId = true);

      return formatMongoData(result)
    }
    else
      throw new Error(constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_ERROR);
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}


module.exports.getAllEstimationHeaderAtrribute = async ({ skip = 0, limit = 10 }) => {
  try {
    let estimationHeaderAtrribute = await EstimationHeaderAtrribute.find().sort({ updatedAt: -1 }).skip(parseInt(skip)).limit(parseInt(limit));

    return formatMongoData(estimationHeaderAtrribute)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}

module.exports.getEstimationHeaderAtrributeById = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.estimationHeaderAtrributeMessage.INVALID_ID)
    }
    let estimationHeaderAtrribute = await EstimationHeaderAtrribute.findById(id)
      .populate(
        {
          path: 'projects',
          options: { sort: { updatedAt: -1 } }
        });
    if (!estimationHeaderAtrribute) {
      throw new Error(constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_NOT_FOUND)
    }
    return formatMongoData(estimationHeaderAtrribute)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}

module.exports.estimationHeaderAtrributeUpdate = async ({ id, updateInfo }) => {
  try {
    const findRecord = await EstimationHeaderAtrribute.find({ estHeaderId: updateInfo.estHeaderId });
    if (findRecord.length != 0) {
      throw new Error(constant.estimationHeaderAtrributeMessage.DUPLICATE_estimationHeaderAtrribute);
    }

    let estimationHeaderAtrribute = await EstimationHeaderAtrribute.findOneAndUpdate({ _id: id }, updateInfo, { new: true });
    if (!estimationHeaderAtrribute) {
      throw new Error(constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_NOT_FOUND)
    }
    return formatMongoData(estimationHeaderAtrribute)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}


module.exports.estimationHeaderAtrributeDelete = async ({ id }) => {
  try {

    let estimationHeaderAtrribute = await EstimationHeaderAtrribute.updateOne({ _id: id }, { isDeleted: true });

    if (!estimationHeaderAtrribute) {
      throw new Error(constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_NOT_FOUND)
    }
    return formatMongoData(estimationHeaderAtrribute)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}
//============================EstimationHeaderAtrributeCalc=======================================================================
module.exports.createEstimationHeaderAtrributeCalc = async (serviceData) => {
  try {
    let estimationHeaderAtrributeCalc = new EstimationHeaderAtrributeCalc({ ...serviceData })
    console.log(">>>>>estimationHeaderAtrributeCalc>>>", estimationHeaderAtrributeCalc)
    let findRecord = await EstimationHeaderAtrributeCalc.find({ estHeaderId: estimationHeaderAtrributeCalc.estHeaderId });
    console.log
      (">>>>>>>11111>>>>>>>" + findRecord + ">>>>>>>>>>>>>>>>>>>>>>>>")
    if (findRecord.length != 0) {
      throw new Error(constant.estimationHeaderAtrributeCalcMessage.DUPLICATE_estimationHeaderAtrributeCalc);

    }
    let result = await estimationHeaderAtrributeCalc.save();
    console.log(">>>>>>>>>>>>>>>234234234", result + ">>>>>>>>>>>>>>>")
    return formatMongoData(result)

  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}


module.exports.getAllEstimationHeaderAtrributeCalc = async ({ skip = 0, limit = 10 }) => {
  try {
    let estimationHeaderAtrributeCalc = await EstimationHeaderAtrributeCalc.find().sort({ updatedAt: -1 }).skip(parseInt(skip)).limit(parseInt(limit));

    return formatMongoData(estimationHeaderAtrributeCalc)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}

module.exports.getEstimationHeaderAtrributeCalcById = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.estimationHeaderAtrributeCalcMessage.INVALID_ID)
    }
    let estimationHeaderAtrributeCalc = await findById(id).populate('estHeaderId').populate({
      path: 'estimates',
      populate: { path: 'estHeaderId' }
    });
    if (!estimationHeaderAtrributeCalc) {
      throw new Error(constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_NOT_FOUND)
    }
    return formatMongoData(estimationHeaderAtrributeCalc)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}

module.exports.estimationHeaderAtrributeCalcUpdate = async ({ id, updateInfo }) => {
  try {
    const findRecord = await EstimationHeaderAtrributeCalc.find({ estHeaderId: updateInfo.estHeaderId });
    if (findRecord.length != 0) {
      throw new Error(constant.estimationHeaderAtrributeCalcMessage.DUPLICATE_estimationHeaderAtrributeCalc);
    }

    let estimationHeaderAtrributeCalc = await EstimationHeaderAtrributeCalc.findOneAndUpdate({ _id: id }, updateInfo, { new: true });
    if (!estimationHeaderAtrributeCalc) {
      throw new Error(constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_NOT_FOUND)
    }
    return formatMongoData(estimationHeaderAtrributeCalc)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}


module.exports.estimationHeaderAtrributeCalcDelete = async ({ id }) => {
  try {

    let estimationHeaderAtrributeCalc = await EstimationHeaderAtrributeCalc.updateOne({ _id: id }, { isDeleted: true });

    if (!estimationHeaderAtrributeCalc) {
      throw new Error(constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_NOT_FOUND)
    }
    return formatMongoData(estimationHeaderAtrributeCalc)
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err)
  }
}