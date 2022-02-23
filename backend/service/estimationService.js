const constant = require("../constant");
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
const RequirementRepository = require("../repository/requirementRepository");
const EstRequirementServ = require("../service/estimationRequirementService");
const EstResourceCountServ = require("../service/estimationResourceCountService");
const EstTempServ = require("../service/estimationTemplateService");
const EstHeaderModel = require("../database/models/estHeaderModel");
const EstimationCalcAttr = require("../database/models/estimationCalcAttrModel");
const EstResourceCount = require("../database/models/estResourceCount");
const EstResourcePlanning = require("../database/models/estResourcePlanning");
const EstRequirementData = require("../database/models/estRequirementData");
const dbconnection = require("../database/connection");
const { MongoClient } = require('mongodb');

const { result } = require("lodash");


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
      //Please do not remove below liine , will implement this when implement permission based things
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
    console.log(estimation);
    estimation.estStep = "1";
    estimation.createdBy = global.loginId;
    const findRecord = await EstimationHeader.find({
      estName: estimation.estName,
    });
    if (findRecord.length != 0) {
      throw new Error(constant.estimationMessage.ESTIMATION_NAME_UNIQUE);
    }
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
    throw new Error(err);
  }
};

// Update estimation header basic info
module.exports.updateEstimationHeader = async ({ id, updatedInfo }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.estimationMessage.INVALID_ID);
    }

    const findRecord = await EstimationHeader.find({
      estName: updatedInfo.estName,
    });
    updatedInfo.updatedBy = global.loginId;
    if (findRecord.length != 0) {
      if (findRecord.length == 1 && String(findRecord[0]._id) == id) {
        let estimation = await EstimationHeader.findOneAndUpdate(
          { _id: id },
          updatedInfo,
          {
            new: true,
          }
        );
        if (!estimation) {
          throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND);
        }
        return formatMongoData(estimation);
      } else {
        throw new Error(constant.estimationMessage.ESTIMATION_NAME_UNIQUE);
      }
    }
    let estimations = await EstimationHeader.findOneAndUpdate(
      { _id: id },
      updatedInfo,
      { new: true }
    );
    if (!estimations) {
      throw new Error(constant.estimationMessage.ESTIMATION_NOT_FOUND);
    }

    return formatMongoData(estimations);
  } catch (err) {
    console.log(
      "something went wrong: service > Update Estimation Header ",
      err
    );

    throw new Error(err);
  }
};

//============================EstimationHeaderAtrribute=======================================================
module.exports.createEstimationHeaderAtrribute = async (serviceData) => {
  try {
    console.log(".>>>>>>....>>>>>>>." + serviceData);
    //Remove All Attributes from Estimation Header
   
    if (serviceData) {
      let estimation = await EstimationHeader.findById(
        serviceData[0].estHeaderId
      );
      if (estimation) {
        estimation.estStep = "2";
        estimation.updatedBy = global.loginId;
        estimation.save();
      }
      await EstimationHeaderAtrribute.deleteMany({
        estHeaderId: serviceData[0].estHeaderId,
      });
      let result = await EstimationHeaderAtrribute.insertMany(
        serviceData,
        forceServerObjectId = true
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
         await EstimationHeaderAtrributeCalc.deleteOne({
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
        bulk
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

//  function for release estimation



// Release estimation

module.exports.ReleaseEstimation = async (req) => {
  // common error array
  const errorArray = {
    requirementError: [],
    resourceCountAllocationError: "",
    resourceCountDataError: [],
    estimationTemplateError: [],
  };
  let response = { ...constant.publishMessage };
  var estheaderId = req.estimationHeaderId;
  var estheaderid = req.estimationHeaderId;

  try {
    let errorString = [];
    // Find Estimation Data for the given header id
    let estimation = await EstimationHeader.findById(estheaderId);
    if (estimation) {
      // check whether it is already published or not
      if (estimation.publishDate) {
        return {message:" Estimation Already Published ", publishDate:estimation.publishDate};
      } else {
        var contingency = await RequirementRepository.getContingency(
          estheaderId
        );
        var contingencySuffix = " Contingency";
        // Get requirement details
        var estHeaderRequirement =
          await RequirementRepository.getEstHeaderRequirementWithContingency(
            estheaderId
          );

        if (estHeaderRequirement.length != 0) {
          response.requirementList = await getRequirementList(
            estHeaderRequirement,
            contingency,
            contingencySuffix
          ); 
          const validatedrequirement = replaceEmptyKeys(
            response.requirementList
          );

          if (validatedrequirement.length != 0) {
            errorArray.requirementError = [...validatedrequirement];

          } 
        } else {
          throw new Error('Add data to this Estimation')
        }

        // Get Manual data
        response.summaryCalData =
        await RequirementRepository.getCalculativeAttributes(
          estheaderId,
          contingency,
          contingencySuffix
        );
        //  To check Manual field
        checkManualField(response.summaryCalData)
        // if (getManualData.msg != '') {
        //  throw new Error(getManualData.msg)
        // }

        // Get Resource Count Data

        var resourceCount = await EstResourceCountServ.getResourceCount({
          estheaderid
        });


        if (resourceCount.length != 0) {

        var valError = getValidationError(resourceCount);
        if (valError.msg != '') {
          errorArray.resourceCountAllocationError = "Allocate Resource Properly";
        } else {
          errorArray.resourceCountAllocationError = "";
        }
      } else {
        throw new Error('Allocate Resource First')

      }
        var getResCountData = replaceEmptyKeys(test(resourceCount));
       
        if (getResCountData.length != 0) {
          errorArray.resourceCountDataError = getResCountData;

        }
    
        // Get basic details to check the SWAG, EPIC and ROM
        let estimations = await getEstBasicDetail(estheaderId);

        response.basicDetails = estimations;

        response.isReqValid = checkValidation(
          estimations.estTypeId.reqTypeValidation,
          response.requirementList
        );
        if (response.isReqValid.length === 0) {
          errorArray.estimationTemplateError = [];

          
        } else {
          errorArray.estimationTemplateError = response.isReqValid;
        }
        

        console.log('errorArray',errorArray);
   if (
          errorArray.requirementError.length == 0 &&
          errorArray.resourceCountAllocationError == "" &&
          errorArray.resourceCountDataError.length == 0  &&
          errorArray.estimationTemplateError.err.length == 0 
        ) {
          estimation.publishDate = Date.now();
          let result = await estimation.save();
          return {res: result, message:"Estimation Published Successfully"};
        } else {
          
    if(errorArray.requirementError.length != 0) {
      errorString.push("Requirement Data Not defined")
    }
    if(errorArray.resourceCountAllocationError != '') {
      errorString.push("Please Allocate Resource properly")
    }
    if(errorArray.resourceCountDataError.length != 0) {
      errorString.push("Resource Count Data is missing")
    }
    if(errorArray.estimationTemplateError.err.length != 0) {
      errorString.push(errorArray.estimationTemplateError.err.toString())
    }
          return { res: errorArray, message: `Error: ${errorString.toString()}` };
        }
      }
    } else {
      return { message: "No Estimation Found" };
    }
  } catch (err) {
    throw new Error(err);
  }
};

//Versioning Estimation
module.exports.versioningEstimation = async ({ id }) => {
  try {
    const parentEstimation = await EstimationHeader.findById( { _id: id } );
    parentEstimation.publishDate = parentEstimation.publishDate == undefined ? '' : parentEstimation.publishDate;
    parentEstimation.isDeleted = parentEstimation.isDeleted == undefined ? '' : parentEstimation.isDeleted;
    console.log(`parentEstimation.publishDate: ${parentEstimation.publishDate}`);
    
    if (parentEstimation && (parentEstimation.publishDate != null && parentEstimation.publishDate != '')
     && (parentEstimation.isDeleted != null && parentEstimation.isDeleted == false)) {
      
      let createVersionEstPayload = prepreVersionEstHeaderdto(parentEstimation);
      createVersionEstPayload.estheaderParentid = parentEstimation._id;
      createVersionEstPayload.publishDate = null;
      //TODO Verify Request Version and new Version
      let versionNo = parentEstimation.estVersionno && parentEstimation.estVersionno >0 ? parentEstimation.estVersionno + 1 : 1;
      createVersionEstPayload.estVersionno = versionNo;
      
      //estheaders
      const versionEstimationResult =  await this.createVersionEstimationHeader(createVersionEstPayload);
      let newVersionEstHeaderId = versionEstimationResult._id;
      
      if(newVersionEstHeaderId){

        let estimation = await EstimationHeader.updateOne(
          { _id: id },
          { isDeleted: true, updatedBy: global.loginId }
        );

        console.log(`newVersionEstHeaderId: ${newVersionEstHeaderId}`);
        //estheaderrequirements
        await this.createEstHeaderRequirements(id, newVersionEstHeaderId);
        
        //estimationheaderattributecalcs
        await this.createEstHeaderAttrCalcs(id, newVersionEstHeaderId);

        //estHeaderAttributes
        await this.createEstHeaderAttributes(id, newVersionEstHeaderId);

        //estresourcecounts
        await this.createEstResourceCounts(id, newVersionEstHeaderId);

      }

      return formatMongoData(versionEstimationResult);
    }else{
      console.log("Selected Estimation not Published or Deactivate. Can not create Version for this estimation ");
      throw new Error('Selected Estimation not Published or deactivate. Can not create Version for this estimation');
    }
  } catch (err) {
    console.log("something went wrong: service > versioningEstimation ", err);
    //TODO for Rollback or delete if something happens
    throw new Error(err);
  }
};

module.exports.createVersionEstimationHeader = async (serviceData, session) => {
  try {
    let estimation = new EstimationHeader(serviceData);
    estimation.createdBy = global.loginId;
      
    let result = estimation.save().then( async (res, err) => {
      //added estHeader to projectmasters
      const projectModel = await ProjectModel.findById({
        _id: res.projectId,
      });
      projectModel.estimates.push(res);
      await projectModel.save();
      return res;
    })

    console.log('Version Estimation Requirement Datas Created Successfully 1');
    return formatMongoData(result);
  } catch (err) {
    console.log("something went wrong: service > createVersionEstimationHeader ",err);
    throw new Error(err);
  }
};

module.exports.createEstHeaderRequirements = async (currentEstimationHeaderId, newEstimationHeaderId) => {
  try {
    const currentEstHeaderRequirements = await EstHeaderRequirement.find({ estHeader: currentEstimationHeaderId });
    if(currentEstHeaderRequirements){
      currentEstHeaderRequirements.forEach( async (currentEstHeaderRequirement) => {

        let estHeaderRequirement = new EstHeaderRequirement({ 
          requirement: currentEstHeaderRequirement.requirement,
          estHeader: newEstimationHeaderId,
          isDeleted: false,
        });
       await estHeaderRequirement.save().then(async (res, err) =>{
          await this.createEstRequirementDatas(currentEstHeaderRequirement._id, res._id, newEstimationHeaderId);
        });
      });
      console.log('Version Estimation Header Requirements Created Successfully 2');
    }
  } catch (err) {
    console.log("something went wrong: service > createEstHeaderRequirements ",err);
    throw new Error(err);
  }
};

module.exports.createEstRequirementDatas = async (estHeaderRequirementID, newRequirementId, newEstimationHeaderId) => {
  
  try {
    const parentEstRequirementDatas = await EstRequirementData.find({ ESTHeaderRequirementID: estHeaderRequirementID});
    if(parentEstRequirementDatas){
      parentEstRequirementDatas.forEach( async (parentEstRequirementData) => {
        
        const createEstRequirementDataPayLoad = new EstRequirementData();
        createEstRequirementDataPayLoad.ESTAttributeID = parentEstRequirementData.ESTAttributeID;
        createEstRequirementDataPayLoad.ESTHeaderRequirementID = newRequirementId;
        if(parentEstRequirementData.ESTHeaderID){
          createEstRequirementDataPayLoad.ESTHeaderID = newEstimationHeaderId;
        }
        createEstRequirementDataPayLoad.ESTData = parentEstRequirementData.ESTData;
        await createEstRequirementDataPayLoad.save();
      });
      console.log('Version Estimation Requirement Datas Created Successfully 3');
    }
  } catch (err) {
    console.log("something went wrong: service > createEstRequirementDatas ",err);
    throw new Error(err);
  }
};

module.exports.createEstHeaderAttrCalcs = async(parentEstHeaderId, newVersionEstHeaderId) => {
  var estHeaderAttrResponse = [];
  try{
      let parentEstHeaderAttrs = await EstimationHeaderAtrributeCalc.find({ estHeaderId: parentEstHeaderId });
     if(parentEstHeaderAttrs){
        parentEstHeaderAttrs.forEach(async (parentEstHeaderAttr) => {
          const estHeaderAttrPayLoad = new EstimationHeaderAtrributeCalc();
          estHeaderAttrPayLoad.estHeaderId = newVersionEstHeaderId;
          estHeaderAttrPayLoad.estCalcId = parentEstHeaderAttr.estCalcId;
          estHeaderAttrPayLoad.calcAttribute = parentEstHeaderAttr.calcAttribute;
          estHeaderAttrPayLoad.calcAttributeName = parentEstHeaderAttr.calcAttributeName;
          estHeaderAttrPayLoad.isFormula = parentEstHeaderAttr.isFormula;
          estHeaderAttrPayLoad.formula = parentEstHeaderAttr.formula;
          estHeaderAttrPayLoad.operator = parentEstHeaderAttr.operator;
          estHeaderAttrPayLoad.unit = parentEstHeaderAttr.unit;
          estHeaderAttrPayLoad.description = parentEstHeaderAttr.description;
          estHeaderAttrPayLoad.value = parentEstHeaderAttr.value;
          estHeaderAttrPayLoad.calcType = parentEstHeaderAttr.calcType;
          estHeaderAttrPayLoad.tag = parentEstHeaderAttr.tag;
          estHeaderAttrPayLoad.formulaTags = parentEstHeaderAttr.formulaTags;
          await estHeaderAttrPayLoad.save();
        });
        console.log('Version Estimation Header Attr Calc Created Successfully 4');
     }
    } catch (err) {
      console.log("something went wrong: service > createEstHeaderAttrCalcs ",err);
      throw new Error(err);
    }
};

module.exports.createEstHeaderAttributes = async(parentEstHeaderId, resultEstimationHeaderId) => {
  try {
    //estHeaderAttributes
      let parentEstHeaderAttrs = await EstimationHeaderAtrribute.find({estHeaderId: parentEstHeaderId});
      if(parentEstHeaderAttrs){
        parentEstHeaderAttrs.forEach(async (parentEstHeaderAttr) => {
          const newEstHeaderAttrPayLoad = new EstimationHeaderAtrribute();
          newEstHeaderAttrPayLoad.estHeaderId = resultEstimationHeaderId;
          newEstHeaderAttrPayLoad.estAttributeId = parentEstHeaderAttr.estAttributeId;
          await newEstHeaderAttrPayLoad.save();
        })
        console.log('Version Estimation Header Attr Created Successfully 5');
      }
  } catch (err) {
    console.log("something went wrong: service > createEstHeaderAttributes ",err);
    throw new Error(err);
  }
};

module.exports.createEstResourceCounts = async(parentEstHeaderId, newEstiHeaderId) => {
  try {
    //estHeaderAttributes
      let parentEstResourceCounts = await EstResourceCount.find({estHeaderId: parentEstHeaderId});
      if(parentEstResourceCounts){
        parentEstResourceCounts.forEach(async (parentEstResourceCount) => {
          console.log(`parentEstResourceCounts: ${parentEstResourceCount._id}`);
          console.log(parentEstResourceCount);
          const newEstResourceCountPayLoad = new EstResourceCount();
          newEstResourceCountPayLoad.estAttributeId = parentEstResourceCount.estAttributeId;
          newEstResourceCountPayLoad.estHeaderId = newEstiHeaderId;
          newEstResourceCountPayLoad.estCalcId = parentEstResourceCount.estCalcId;
          newEstResourceCountPayLoad.attributeName = parentEstResourceCount.attributeName;
          newEstResourceCountPayLoad.resourceCount = parentEstResourceCount.resourceCount;
          newEstResourceCountPayLoad.techSkill = parentEstResourceCount.techSkill;
          await newEstResourceCountPayLoad.save().then(async (res, err) => {
            //estresourcePlannings
            await this.createEstResourcePlannings(res._id, parentEstResourceCount._id, parentEstHeaderId, newEstiHeaderId);
          });
        })
        console.log('Version Estimation Resoiurce Count Created Successfully 6');
      }
  } catch (err) {
    console.log("something went wrong: service > createEstResourceCounts ",err);
    throw new Error(err);
  }
};

module.exports.createEstResourcePlannings = async(newResouceCoundId, parentEstResourceCountId, parentEstHeaderId, newEstiHeaderId) => {
  try {
    //createEstResourcePlannings
      let parentEstResourcePlannings = await EstResourcePlanning.find({estHeaderId: parentEstHeaderId, estResourceCountID: parentEstResourceCountId});
      if(parentEstResourcePlannings){
        parentEstResourcePlannings.forEach(async (parentEstResourcePlannings) => {
          const newEstResourcePlanningsPayLoad = new EstResourcePlanning();
          newEstResourcePlanningsPayLoad.estResourceCountID = newResouceCoundId;
          newEstResourcePlanningsPayLoad.estHeaderId = newEstiHeaderId;
          newEstResourcePlanningsPayLoad.resourceRoleID = parentEstResourcePlannings.resourceRoleID;
          newEstResourcePlanningsPayLoad.estAttributeId = parentEstResourcePlannings.estAttributeId;
          newEstResourcePlanningsPayLoad.estCalcId = parentEstResourcePlannings.estCalcId;
          newEstResourcePlanningsPayLoad.cost = parentEstResourcePlannings.cost;
          newEstResourcePlanningsPayLoad.currency = parentEstResourcePlannings.currency;
          newEstResourcePlanningsPayLoad.allocationPercent = parentEstResourcePlannings.allocationPercent;
          newEstResourcePlanningsPayLoad.defaultAdjusted = parentEstResourcePlannings.defaultAdjusted;
          await newEstResourcePlanningsPayLoad.save()
        })
        console.log('Version Estimation Resource Planning Created Successfully 7');
      }
  } catch (err) {
    console.log("something went wrong: service > createEstResourcePlannings ",err);
    throw new Error(err,'createEstResourcePlannings');
  }
};


// Too simplyfy the requirement data is single object
function getRequirementList(
  estHeaderRequirement,
  contingency,
  contingencySuffix
) {
  var arrayRequirement = [];
  estHeaderRequirement.forEach((item, i) => {
    if (item.isDeleted === false) {
      
      var requirement = {
        Requirement: item.requirement.title,
        Description: item.requirement.description,
        Tagname: item.requirement.tag.name || '',
        Typename: item.requirement.type.name || '',
        Typeid: item.requirement.type._id,
        requirementId: item.requirement._id,
        _id: item._id,
      };

      item.estRequirementData.map((data) => {
       let newObj = {...requirement,
        ESTData:data.ESTData == null ? null : data.ESTData
       };
       arrayRequirement.push(newObj);
      });
      
    }
  });

  return arrayRequirement;
}

// check validation on SWAG, EPIC and ROM

const checkValidation = (validationList, requirementList) => {
  const error = [];
  validationList.map((validationItem) => {
    if (requirementList !== undefined) {
    let foundReq = requirementList.some(
      (req) => req.Typeid.toString() === validationItem.id.toString()
    );

    if (!foundReq) {
      error.push(validationItem.name);
    } }
  });

  return error.length > 0
    ? { err: error, isValid: false }
    : { err: error, isValid: true };
};

// basic detail for estimation

const getEstBasicDetail = async (id) => {
  return await EstHeaderModel.findById({ _id: id })
    .populate({
      path: "projectId",
      populate: { path: "client" },
    })
    .populate({
      path: "estTypeId",
      populate: { path: "reqTypeValidation" },
    });
  
};

// selected item for resource count
const getValidationError = (show) => {
  const validation = show.filter(item => 
    item.validationerror === true
  )
  if (validation.length != 0) {  
    return {msg: "Please assign role count Properply"};
  } else {
    return {msg:''};
  }
};

// Resource Count data
function test(arr) {
  const data = [];
  arr.map((item) => {
    if (item.resourceCount > 0) {
      var resource = {
        resourceCount: item.resourceCount,
        attributeName: item.attributeName,
        skills: item.skills,
        skillsId: item.skillsId,
      };
      data.push(resource);
      return resource;
    }
  });
  return data;
}

// Check whether manual hai record or not

function checkManualField (data) {

  const arr = data.filter(item => item.calcType == 'manual')
if (arr.find(x => x.Effort == undefined)) {
  throw new Error('Please Enter Manual Calculative Attributes Effort')
} 
}

// Simply get keys


const replaceEmptyKeys = (arr) => {
  let newArr = arr.map((o) => updateKeys(o));
  // return newArr
  return newArr.filter((v)=>Object.keys(v).length !== 0)
};

const updateKeys = (obj) => {
  const finalObj = {};
  for (let oKey in obj) {
    if (!obj[oKey]) {
      finalObj[oKey] = "Not Found";
    }
  }
  return { ...finalObj };
};

const prepreVersionEstHeaderdto = (parentEstimation) =>{
  let estimation = new EstimationHeader();
  estimation.estheaderParentid = parentEstimation.estheaderParentid;
  estimation.estVersionno = parentEstimation.estVersionno;
  estimation.projectId = parentEstimation.projectId;
  estimation.estName = parentEstimation.estName;
  estimation.estTypeId = parentEstimation.estTypeId;
  estimation.estDescription = parentEstimation.estDescription;
  estimation.effortUnit = parentEstimation.effortUnit;
  estimation.manCount = parentEstimation.manCount;
  estimation.contingency = parentEstimation.contingency;
  estimation.totalCost = parentEstimation.totalCost;
  estimation.estCalcColumns = parentEstimation.estCalcColumns;
  estimation.estColumns = parentEstimation.estColumns;
  estimation.isDeleted = parentEstimation.isDeleted;
  estimation.estStep = parentEstimation.estStep;
  estimation.estTentativeTimeline = parentEstimation.estTentativeTimeline;
  estimation.publishDate = parentEstimation.publishDate;
  estimation.locations = parentEstimation.locations;
  return estimation;
};
