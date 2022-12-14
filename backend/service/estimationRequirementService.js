const constant = require("../constant");
const { ObjectId } = require("mongodb");
const EstHeaderModel = require("../database/models/estHeaderModel");
const ProjectRequirement = require("../database/models/projectRequirement");
const EstHeaderRequirement = require("../database/models/estHeaderRequirement");
const EstRequirementData = require("../database/models/estRequirementData");
const { formatMongoData } = require("../helper/dbhelper");
const EstimationHeaderAttributeModel = require("../database/models/estimationHeaderAtrributeModel");
const mongoose = require("mongoose");
const RequirementRepository = require("../repository/requirementRepository");

const EstimationHeaderAttributeCalc = require("../database/models/estimationHeaderAtrributeCalcModel");
const { defaultResponce } = require("../constant");
const ShareDataModel = require("../database/models/shareDataModel");
const userService = require("../service/userService");

module.exports.create = async (serviceData) => {
  try {
    let requirement = await RequirementRepository.createRequirement(
      serviceData
    );

    if (requirement !== false) {
      await RequirementRepository.createQueryAssumption(
        requirement._id,
        serviceData
      );
      if (serviceData.estHeader.length != 0) {
        return formatMongoData(
          await RequirementRepository.mapHeaderRequirement(
            requirement._id,
            serviceData
          )
        );
      }

      return formatMongoData(requirement);
    } else {
      throw new Error(constant.requirementMessage.DUPLICATE_REQUIREMENT);
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.mapHeaderToMultipleRequirement = async (serviceData) => {
  try {
    var result = await RequirementRepository.mapHeaderToMultipleRequirement(
      serviceData.id,
      serviceData.updateInfo.data
    );
    return formatMongoData(result);
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

    var requirementList = await RequirementRepository.getRequirementWithQuery(
      id
    );
    let response = { ...constant.requirementListResponse };
    response.featureList = requirementList;
    var estimationCount =
      await RequirementRepository.numberOfEstimationInProject(id);
    if (estimationCount.length != 0) {
      response.noOfEstimation = estimationCount[0].estimationCount;

      if (response.featureList.length != 0 && response.noOfEstimation == 0) {
        response.showDeleteAllRequirement = true;
      } else {
        response.showDeleteAllRequirement = false;
      }
    } else {
      response.noOfEstimation = 0;
      if (response.featureList.length == 0) {
        response.showDeleteAllRequirement = false;
      } else {
        response.showDeleteAllRequirement = true;
      }
    }

    return formatMongoData(response);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getUnpairedRequirementEstimation = async (query) => {
  try {
    var requirementList = await RequirementRepository.getRequirementWithQuery(
      query.projectId
    );
    var unpairedRequirementEstimation =
      await RequirementRepository.getUnpairedRequirementEstimation(
        requirementList,
        query.estHeader
      );
    let response = { ...constant.requirementResponse };
    response.featureList = unpairedRequirementEstimation;

    return formatMongoData(response);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.updateManualCallAttribute = async (id, updateInfo) => {
  try {
    var bulk =
      EstimationHeaderAttributeCalc.collection.initializeUnorderedBulkOp();
    updateInfo.forEach(async (serviceData) => {
      let manualCallAttribute = new EstimationHeaderAttributeCalc({
        ...serviceData,
      });
      bulk
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
            new: true,
          }
        );
    });

    const result = await bulk.execute();

    return formatMongoData(result);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.updateRequirement = async ({ id, updateInfo }) => {
  try {
    const findRecord = await ProjectRequirement.find(
      { title: updateInfo.title },
      { project: updateInfo.project }
    );
    updateInfo.updatedBy = global.loginId;
    if (findRecord.length != 0) {
      var alreadyAvailable = true;

      var projectReq = ProjectRequirement();
      findRecord.forEach((record) => {
        console.log("Req: ", String(record._id));
        if (String(record._id) == id) {
          alreadyAvailable = false;
          projectReq = record;
        }
      });

      if (alreadyAvailable) {
        throw new Error(constant.requirementMessage.DUPLICATE_REQUIREMENT);
      } else {
        let requirement = await ProjectRequirement.findOneAndUpdate(
          { _id: projectReq._id },
          updateInfo,
          { new: true }
        );
        if (!requirement) {
          throw new Error(constant.requirementMessage.REQUIREMENT_NOT_FOUND);
        }

        await RequirementRepository.updateQuery(requirement._id, updateInfo);

        return formatMongoData(requirement);
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

      await RequirementRepository.updateQuery(requirement._id, updateInfo);
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.updateRequirementData = async (serviceDataArray) => {
  try {
    var estHeader = "";
    var bulk = EstRequirementData.collection.initializeUnorderedBulkOp();
    serviceDataArray.data.forEach(async (serviceData) => {
      let estRequirementData = new EstRequirementData({ ...serviceData });
      bulk
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

    await bulk.execute();
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
  } catch (err) {
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
    return formatMongoData(estHeaderRequirement);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.allRequirementDelete = async (id) => {
  try {
    var estimationCount =
      await RequirementRepository.numberOfEstimationInProject(id);
    if (estimationCount.length == 0) {
      var deleteAllRequirements =
        await RequirementRepository.deleteAllRequirements(id);
      return formatMongoData(deleteAllRequirements);
    } else {
      throw new Error(constant.requirementMessage.DELETE_ALL_REQUIREMENT_ERROR);
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.deleteSelectedRequirement = async (id, requirementList) => {
  try {
    await RequirementRepository.deleteRequirementQueryAssumption(
      requirementList
    );
    var ProjectRequirementResponse =
      await RequirementRepository.deleteSelectedProjectRequirement(
        requirementList
      );
    return formatMongoData(ProjectRequirementResponse);
  } catch (err) {
    throw new Error(err);
  }
};

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

const getAllVersions = async (parentEstId) => {
  let resp = await EstHeaderModel.find({ estheaderParentid: parentEstId }).sort(
    { estVersionno: 1 }
  );
  console.log("Versions:" + resp);
  return resp;
};

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
    let estimations = await getEstBasicDetail(id);
    response.basicDetails = estimations;
    //6
    let verions = await getAllVersions(estimations.estheaderParentid);
    response.estimationVersions = verions;

    //7
    response.estimationSharePermission = await getEstimationPermission(id);

    return formatMongoData(response);
  } catch (err) {
    throw new Error(err);
  }
};

const checkValidation = (validationList, requirementList) => {
  const error = [];

  validationList.map((validationItem) => {
    let foundReq = requirementList.some((req) =>
      req.Type === ""
        ? false
        : req.Type._id.toString() === validationItem.id.toString()
    );

    if (!foundReq) {
      error.push(validationItem.name);
    }
  });

  return error.length > 0
    ? { err: error, isValid: false }
    : { err: error, isValid: true };
};

module.exports.getRequirementData = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId(id)) {
      throw new Error(constant.requirementMessage.INVALID_ID);
    }

    let response = { ...constant.requirementResponse };
    var contingency = await RequirementRepository.getContingency(id);
    var contingencySuffix = " Contingency";
    var estHeaderRequirement =
      await RequirementRepository.getEstHeaderRequirementWithContingency(id);
    if (estHeaderRequirement.length != 0) {
      response.featureList = estHeaderRequirement;
    }
    response.requirementList = await getRequirementList(
      estHeaderRequirement,
      contingency,
      contingencySuffix
    );

    response.tagSummaryHeader = await getTagSummaryHeader(id);
    response.tagSummaryData =
      await RequirementRepository.tagWiseRequirementList(
        id,
        contingency,
        contingencySuffix
      );
    var tagTotal = response.tagSummaryData[response.tagSummaryData.length - 1];
    response.summaryCalData =
      await RequirementRepository.getCalculativeAttributes(
        id,
        contingency,
        contingencySuffix
      );

    var projectTotal = {
      id: 1,
      calcType: "percentage",
      calculative: "Estimation Total",
      Effort: 0,
      Contingency: 0,
    };

    if (
      tagTotal.total !== undefined &&
      tagTotal.total_Contingency !== undefined
    ) {
      projectTotal.Effort = tagTotal.total;
      projectTotal.Contingency = tagTotal.total_Contingency;
    }

    response.summaryCalData.forEach((item, i) => {
      if (item.Effort !== undefined && !isNaN(item.Contingency)) {
        projectTotal.Effort = item.Effort + projectTotal.Effort; //undifine
        projectTotal.Contingency = item.Contingency + projectTotal.Contingency; //nan
      }
    });

    projectTotal.Effort = roundToTwo(projectTotal.Effort);
    projectTotal.Contingency = roundToTwo(projectTotal.Contingency);
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
        width: 200,
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

    //5
    let estimations = await getEstBasicDetail(id);
    response.basicDetails = estimations;

    //check validation for req type
    //6
    response.isReqValid = checkValidation(
      estimations.estTypeId.reqTypeValidation,
      response.requirementList
    );

    return formatMongoData(response);
  } catch (err) {
    throw new Error(err);
  }
};

async function getRequirementList(
  estHeaderRequirement,
  contingency,
  contingencySuffix
) {
  var arrayRequirement = [];
  estHeaderRequirement.forEach((item, i) => {
    if (item.isDeleted === false) {
      var tag = "";
      var tagid = 0;
      var type = "";

      if (item.requirement.tag !== undefined) {
        tag = item.requirement.tag.name;

        tagid = item.requirement.tag._id;
      }
      if (item.requirement.type !== undefined) {
        type = item.requirement.type;
      }

      var requirement = {
        Requirement: item.requirement.title,
        Description: item.requirement.description,
        Tag: tag,
        Tagid: tagid,
        Type: type,
        requirementId: item.requirement._id,
        _id: item._id,
        id: item._id,
        action: item._id,
        req_id: item.requirement.req_id,
      };

      if (item.requirement.queryassumptions.length !== 0) {
        requirement["queryassumptionsId"] =
          item.requirement.queryassumptions[0]._id;
        requirement["Query"] = item.requirement.queryassumptions[0].query;
        requirement["Assumption"] =
          item.requirement.queryassumptions[0].assumption;
        requirement["Reply"] = item.requirement.queryassumptions[0].reply;
      }
      item.estRequirementData.forEach((estRequirementItem, index) => {
        if (
          estRequirementItem.ESTData !== undefined &&
          estRequirementItem.ESTData !== null
        ) {
          if (
            estRequirementItem.ESTAttributeID !== undefined &&
            estRequirementItem.ESTAttributeID !== null
          ) {
            requirement[estRequirementItem.ESTAttributeID._id] =
              estRequirementItem.ESTData;
            if (contingency > 0) {
              requirement[
                estRequirementItem.ESTAttributeID._id + contingencySuffix
              ] = estRequirementItem.ESTDataContingency;
            }
          }
        }
      });
      arrayRequirement.push(requirement);
    }
  });

  return arrayRequirement;
}

async function getTagSummaryHeader(estHeaderId) {
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
    code: 1,
    editable: false,
    width: 300,
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
          width: 120,
        });

        if (contingency > 0) {
          estHeaderAttribute.push({
            field: element.estAttributeId._id + contingencySuffix,
            description: element.estAttributeId.description,
            headerName:
              element.estAttributeId.attributeName + contingencySuffix,
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
    code: 2,
    editable: false,
    width: 100,
  });

  if (contingency > 0) {
    estHeaderAttribute.push({
      field: "total_Contingency",
      description: "",
      headerName: "Total Contingency",
      id: 2,
      code: 2,
      editable: false,
      width: 120,
    });
  }
  return estHeaderAttribute;
}

async function getEstHeaderAttribute(estHeaderId) {
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
          width: 120,
        });

        if (contingency > 0) {
          estHeaderAttribute.push({
            field: element.estAttributeId._id + contingencySuffix,
            description: element.estAttributeId.description,
            headerName:
              element.estAttributeId.attributeName + contingencySuffix,
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

function roundToTwo(value) {
  return Number(Number(value).toFixed(2));
}

async function getEstimationPermission(estHeaderId) {
  let sharedata = await ShareDataModel.findOne({
    typeId: estHeaderId,
    shareUserId: global.loginId,
  });
  return userService.getEstimationRolePermission(sharedata?.roleId);
}
