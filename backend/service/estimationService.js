const constant = require("../constant");
//const Estimation = require("../database/models/estimationModel")
const EstimationHeader = require("../database/models/estHeaderModel");
const EstimationTemplateModel = require("../database/models/estimationTemplateModel");
const ProjectModel = require("../database/models/projectModel");
const { formatMongoData } = require("../helper/dbhelper");
const mongoose = require("mongoose");
const EstimationHeaderAtrribute = require("../database/models/estimationHeaderAtrributeModel");
const EstimationHeaderAtrributeCalc = require("../database/models/estimationHeaderAtrributeCalcModel");
const EstimationHeaderAtrributeSchema = require("../database/models/estimationHeaderAtrributeModel");
const EstHeaderRequirement = require("../database/models/estHeaderRequirement");
const { estimationHeaderAtrributeMessage } = require("../constant");
const RequirementType = require("../database/models/requirementType");
const RequirementTag = require("../database/models/requirementTag");
const EstimationHeaderAtrributeModel = require("../database/models/estimationHeaderAtrributeModel");

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
    let estimation = await EstimationHeader.updateOne(
      { _id: id },
      { isDeleted: true, updatedBy: global.loginId }
    );

    if (!estimation) {
      throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND);
    }
    return formatMongoData(estimation);
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};

module.exports.getRecentEstimation = async ({ skip = 0, limit = 10 }) => {
  try {
    let estimations = await EstimationHeader.find({ isDeleted: false })
      //TODO: Please do not remove below liine , will implement this when implement permission based things
      //.or([{createdBy: global.loginId}, {updatedBy: global.loginId }])
      .populate({
        path: "projectId",
        match: { isDeleted: false },
        populate: {
          path: "client createdBy updatedBy",
          match: { isDeleted: false },
        },
      })
      .populate({
        path: "estTypeId",
      })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort({ updatedAt: "desc" });

    let result = [];
    estimations.forEach((element) => {
      if (element.projectId != null && element.projectId.client != null) {
        result.push(element);
        //console.log(element)
      }
    });

    return formatMongoData(result);
  } catch (err) {
    console.log("something went wrong: service > createEstimation Header", err);
    throw new Error(err);
  }
};

// create new estimation header configration
module.exports.createEstimationHeader = async (serviceData) => {
  try {
    let estimation = new EstimationHeader({ ...serviceData });
    estimation.estStep = "1";
    estimation.createdBy = global.loginId;
    let result = await estimation.save();

    const projectModel = await ProjectModel.findById({
      _id: estimation.projectId,
    });
    projectModel.estimates.push(estimation);
    await projectModel.save();

    return formatMongoData(result);
  } catch (err) {
    console.log(
      "something went wrong: service > createEstimation Header ",
      err
    );
    if(err.message.includes("unique") && err.message.includes("estName")){
      throw new Error(constant.estimationMessage.ESTIMATION_NAME_UNIQUE)
    }else{
    throw new Error(err);
    }
  }
};

// Update estimation header basic info
module.exports.updateEstimationHeader = async ({ id, updatedInfo }) => {
  try {
    updatedInfo.updatedBy = global.loginId;
    let estimation = await EstimationHeader.findOneAndUpdate(
      { _id: id },
      updatedInfo,
      { new: true }
    );
    if (!estimation) {
      throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND);
    }

    return formatMongoData(estimation);
  } catch (err) {
    console.log(
      "something went wrong: service > Update Estimation Header ",
      err
    );
    if(err.message.includes("unique") && err.message.includes("estName")){
      throw new Error(constant.estimationMessage.ESTIMATION_NAME_UNIQUE)
    }else{
    throw new Error(err);
    }
  }
};

//============================EstimationHeaderAtrribute=======================================================
module.exports.createEstimationHeaderAtrribute = async (serviceData) => {
  try {
    console.log(".>>>>>>....>>>>>>>." + serviceData);
    //Remove All Attributes from Estimation Header
    let estimationHeaderAtrributeCalc = new EstimationHeaderAtrribute({
      serviceData,
    });
    if (serviceData) {
      let estimation = await EstimationHeader.findById(
        serviceData[0].estHeaderId
      );
      if (estimation) {
        estimation.estStep = "2";
        estimation.updatedBy = global.loginId;
        estimation.save();
      }
      let resultdelete = await EstimationHeaderAtrribute.deleteMany({
        estHeaderId: serviceData[0].estHeaderId,
      });
      let result = await EstimationHeaderAtrribute.insertMany(
        serviceData,
        (forceServerObjectId = true)
      );

      return formatMongoData(result);
    } else
      throw new Error(
        constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_ERROR
      );
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};

module.exports.getAllEstimationHeaderAtrribute = async ({
  skip = 0,
  limit = 10,
}) => {
  try {
    let estimationHeaderAtrribute = await EstimationHeaderAtrribute.find()
      .sort({ updatedAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    return formatMongoData(estimationHeaderAtrribute);
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};

module.exports.getEstimationHeaderAtrributeById = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.estimationHeaderAtrributeMessage.INVALID_ID);
    }
    let estimationHeaderAtrribute = await EstimationHeaderAtrribute.findById(
      id
    ).populate({
      path: "projects",
      populate: { path: "createdBy updatedBy" },
      options: { sort: { updatedAt: -1 } },
    });
    if (!estimationHeaderAtrribute) {
      throw new Error(
        constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_NOT_FOUND
      );
    }
    return formatMongoData(estimationHeaderAtrribute);
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};

module.exports.estimationHeaderAtrributeUpdate = async ({ id, updateInfo }) => {
  try {
    const findRecord = await EstimationHeaderAtrribute.find({
      estHeaderId: updateInfo.estHeaderId,
    });
    if (findRecord.length != 0) {
      throw new Error(
        constant.estimationHeaderAtrributeMessage.DUPLICATE_estimationHeaderAtrribute
      );
    }

    let estimationHeaderAtrribute =
      await EstimationHeaderAtrribute.findOneAndUpdate(
        { _id: id },
        updateInfo,
        { new: true }
      );
    if (!estimationHeaderAtrribute) {
      throw new Error(
        constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_NOT_FOUND
      );
    }
    return formatMongoData(estimationHeaderAtrribute);
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};

module.exports.estimationHeaderAtrributeDelete = async ({ id }) => {
  try {
    let estimationHeaderAtrribute = await EstimationHeaderAtrribute.updateOne(
      { _id: id },
      { isDeleted: true }
    );

    if (!estimationHeaderAtrribute) {
      throw new Error(
        constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_NOT_FOUND
      );
    }
    return formatMongoData(estimationHeaderAtrribute);
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};
//============================EstimationHeaderAtrributeCalc=======================================================================
module.exports.createEstimationHeaderAtrributeCalc = async (serviceData) => {
  try {
    if (serviceData) {
      let estimation = await EstimationHeader.findById(
        serviceData[0].estHeaderId
      );
      console.log("hi this is service data of final step " + estimation);
      if (estimation) {
        estimation.estStep = "3";
        estimation.updatedBy = global.loginId;
        estimation.save();
      }
      //Delete only which got unselected next save
      let allcalc = await EstimationHeaderAtrributeCalc.find({
        estHeaderId: serviceData[0].estHeaderId,
      });

      allcalc.forEach(async (element) => {
        let checkexists = serviceData.filter(
          (x) => x.estCalcId == element.estCalcId
        );
        if (checkexists.length == 0) {
          let resultdelete = await EstimationHeaderAtrributeCalc.deleteOne({
            estHeaderId: serviceData[0].estHeaderId,
            estCalcId: element.estCalcId,
          });
        }
      });

      //check data based on est header id and calc id , if found- then update , else insert

      var bulk =
        EstimationHeaderAtrributeCalc.collection.initializeUnorderedBulkOp();
      serviceData.forEach(async (element) => {
        let estcalcdata = new EstimationHeaderAtrributeCalc({
          ...element,
        });
        let result = bulk
          .find({
            estHeaderId: mongoose.Types.ObjectId(serviceData[0].estHeaderId),
            estCalcId: mongoose.Types.ObjectId(element.estCalcId),
          })
          .upsert()
          .updateOne(
            {
              $set: {
                isFormula: estcalcdata.isFormula,
                formula: estcalcdata.formula,
                tag: estcalcdata.tag,
                calcType: estcalcdata.calcType,
                formulaTags: estcalcdata.formulaTags,
                operator: estcalcdata.operator,
                unit: estcalcdata.unit,
                description: estcalcdata.description,
                calcAttributeName: estcalcdata.calcAttributeName,
              },
            },
            { upsert: true, new: true }
          );
      });

      return await bulk.execute();
    } else
      throw new Error(
        constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_ERROR
      );
  } catch (err) {
    console.log(
      "something went wrong: service 12121`22> createEstimation ",
      err
    );
    throw new Error(
      constant.estimationHeaderAtrributeMessage.estimationHeaderAtrribute_ERROR
    );
  }
};

module.exports.getAllEstimationHeaderAtrributeCalc = async ({
  skip = 0,
  limit = 10,
}) => {
  try {
    let estimationHeaderAtrributeCalc =
      await EstimationHeaderAtrributeCalc.find()
        .sort({ updatedAt: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit));

    return formatMongoData(estimationHeaderAtrributeCalc);
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};

module.exports.getEstimationHeaderAtrributeCalcById = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.estimationHeaderAtrributeCalcMessage.INVALID_ID);
    }
    let estimationHeaderAtrributeCalc = await findById(id)
      .populate("estHeaderId")
      .populate({
        path: "estimates",
        populate: { path: "estHeaderId" },
      });
    if (!estimationHeaderAtrributeCalc) {
      throw new Error(
        constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_NOT_FOUND
      );
    }
    return formatMongoData(estimationHeaderAtrributeCalc);
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};

module.exports.estimationHeaderAtrributeCalcUpdate = async ({
  id,
  updateInfo,
}) => {
  try {
    const findRecord = await EstimationHeaderAtrributeCalc.find({
      estHeaderId: updateInfo.estHeaderId,
    });
    if (findRecord.length != 0) {
      throw new Error(
        constant.estimationHeaderAtrributeCalcMessage.DUPLICATE_estimationHeaderAtrributeCalc
      );
    }

    let estimationHeaderAtrributeCalc =
      await EstimationHeaderAtrributeCalc.findOneAndUpdate(
        { _id: id },
        updateInfo,
        { new: true }
      );
    if (!estimationHeaderAtrributeCalc) {
      throw new Error(
        constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_NOT_FOUND
      );
    }
    return formatMongoData(estimationHeaderAtrributeCalc);
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};

module.exports.estimationHeaderAtrributeCalcDelete = async ({ id }) => {
  try {
    let estimationHeaderAtrributeCalc =
      await EstimationHeaderAtrributeCalc.updateOne(
        { _id: id },
        { isDeleted: true }
      );

    if (!estimationHeaderAtrributeCalc) {
      throw new Error(
        constant.estimationHeaderAtrributeCalcMessage.estimationHeaderAtrributeCalc_NOT_FOUND
      );
    }
    return formatMongoData(estimationHeaderAtrributeCalc);
  } catch (err) {
    console.log("something went wrong: service > createEstimation ", err);
    throw new Error(err);
  }
};
