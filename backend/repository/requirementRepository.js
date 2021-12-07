const constant = require("../constant");
const { ObjectId } = require("mongodb");
const EstimationCalcAttr = require("../database/models/estimationCalcAttrModel");
const Client = require("../database/models/clientModel");
const EstHeaderModel = require("../database/models/estHeaderModel");
const ProjectRequirement = require("../database/models/projectRequirement");
const QueryAssumptionModel = require("../database/models/queryAssumptionModel");
const EstHeaderRequirement = require("../database/models/estHeaderRequirement");
const EstRequirementData = require("../database/models/estRequirementData");
const { formatMongoData } = require("../helper/dbhelper");
const RequirementType = require("../database/models/requirementType");
const RequirementTag = require("../database/models/requirementTag");
const EstimationHeaderAttributeModel = require("../database/models/estimationHeaderAtrributeModel");
const EstimationHeaderAttributeCalc = require("../database/models/estimationHeaderAtrributeCalcModel");
const EstimationAttributes = require("../database/models/estimationAttributesModel");
const mongoose = require("mongoose");

module.exports.createRequirement = async (serviceData) => {
  let projectRequirement = new ProjectRequirement({ ...serviceData });
  let requirementId = "";
  const findRecord = await ProjectRequirement.find(
    { title: projectRequirement.title },
    { project: projectRequirement.project }
  );

  if (findRecord.length != 0) {
    return findRecord[0];
  } else {
    let result = await projectRequirement.save();
    return result;
  }
};

module.exports.mapHeaderRequirement = async (requirementId, serviceData) => {
  const estHeaderModel = await EstHeaderModel.findById({
    _id: serviceData.estHeader,
  });
  if (estHeaderModel.length == 0) {
    throw new Error(constant.requirementMessage.INVALID_EST_ID);
  }

  const record = await EstHeaderRequirement.find({
    requirement: requirementId,
    estHeader: mongoose.Types.ObjectId(serviceData.estHeader),
  });
  if (record.length != 0) {
    throw new Error(constant.requirementMessage.DUPLICATE_REQUIREMENT);
  }

  let estHeaderRequirement = new EstHeaderRequirement({
    requirement: requirementId,
    estHeader: estHeaderModel._id,
    isDeleted: false,
  });
  let result_estHeaderRequirement = await estHeaderRequirement.save();

  return result_estHeaderRequirement;
};

module.exports.mapHeaderToMultipleRequirement = async (
  estHeaderId,
  serviceDataArray
) => {
  const estHeaderModel = await EstHeaderModel.findById({ _id: estHeaderId });

  if (estHeaderModel.length == 0) {
    throw new Error(constant.requirementMessage.INVALID_EST_ID);
  }

  var index = 0;
  var resultArray = [];
  var result = await serviceDataArray.forEach(async (serviceData) => {
    const record = await EstHeaderRequirement.find({
      requirement: mongoose.Types.ObjectId(serviceData),
      estHeader: mongoose.Types.ObjectId(estHeaderId),
    });

    if (record.length === 0) {
      let estHeaderRequirement = new EstHeaderRequirement({
        requirement: serviceData,
        estHeader: estHeaderModel._id,
        isDeleted: false,
      });
      let result_estHeaderRequirement = await estHeaderRequirement.save();
      resultArray.push(result_estHeaderRequirement);
      if (index == serviceDataArray.length - 1) {
        return resultArray;
      }
      index = index + 1;
    }
  });
};

module.exports.updateQuery = async (projectRequirementId, serviceData) => {
  const findRecord = await QueryAssumptionModel.find(
    { projectRequirement: projectRequirementId },
    { query: serviceData.query }
  );
  if (findRecord.length !== 0) {
    var newQuery = {
      query: serviceData.query,
      assumption: serviceData.assumption,
      reply: serviceData.reply,
    };

    let queryAssumptionModel = await QueryAssumptionModel.findOneAndUpdate(
      { _id: findRecord[0]._id },
      newQuery,
      { new: true }
    );

    return queryAssumptionModel;
  } else {
    return "OK";
  }
};

module.exports.createQueryAssumption = async (
  projectRequirementId,
  serviceData
) => {
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
};

module.exports.getTags = async () => {
  let requirementTag = await RequirementTag.find({}).sort({ name: 1 });
  if (requirementTag.length != 0) {
    return requirementTag;
  } else {
    return [];
  }
};

module.exports.getTypes = async () => {
  let requirementType = await RequirementType.find({}).sort({ name: 1 });
  if (requirementType.length != 0) {
    return requirementType;
  } else {
    return [];
  }
};

module.exports.getUnpairedRequirementEstimation = async (
  requirementList,
  estHeader
) => {
  //  var requirementList = await getRequirementWithQuery(projectId);
  var unpairedRequirement = [];
  var index = 0;

  var result = await EstHeaderRequirement.find({ estHeader: estHeader });

  var temp = requirementList.forEach((element) => {
    const found = result.find(
      ({ requirement }) => String(requirement) === String(element._id)
    );
    if (!found) {
      unpairedRequirement.push(element);
    }
    // if (index == (requirementList.length - 1)) {

    //callback(unpairedRequirement);
    //}
    index = index + 1;
  });
  return unpairedRequirement;
};

module.exports.getContingency = async (estHeaderId) => {
  try {
    let estimations = await EstHeaderModel.findById({ _id: estHeaderId });
    return estimations.contingency;
  } catch (err) {
    //console.log("something went wrong: service > GetEstimation data", err);
    throw new Error(err);
  }
};

module.exports.getEstHeaderRequirementWithContingency = async (estHeaderId) => {
  try {
    let estimations = await EstHeaderModel.findById({ _id: estHeaderId });
    console.log(estimations);
    //if (estimations.length != 0) {
    var requirementData = await requirementDataForEstHeader(estHeaderId);
    //}
    console.log("requirement: ", requirementData);
    requirementData.forEach((requirementElement) => {
      console.log("--------------");
      // console.log("---",requirementElement);
      requirementElement.estRequirementData.forEach((estRequirement) => {
        //   console.log("estRequirementData: ",estRequirement);
        if (
          estRequirement.ESTData !== undefined &&
          estRequirement.ESTData !== 0
        ) {
          estRequirement["ESTDataContingency"] =
            (estRequirement.ESTData * estimations.contingency) / 100;
        } else {
          estRequirement["ESTDataContingency"] = 0;
        }
        console.log(estRequirement);
      });
    });
    return requirementData;
  } catch (err) {
    //console.log("something went wrong: service > GetEstimation data", err);
    throw new Error(err);
  }
};
function calculateContingency(value,contingency ) {
  return Math.round(value + ((value * contingency) / 100));
}
module.exports.tagWiseRequirementList = async (estHeaderId, contingency, contingencySuffix) => {
  try{
   var tagWiseRequirement = await queryTagWiseRequirementForEstHeader(estHeaderId);
   var tagSummaryDataArray = [];
   var attributeTotal = { id: 1, tag: "Total", };
  
  tagWiseRequirement.forEach((tags, i) => {
     if(tags._id !== undefined && tags._id !== null){
    var tagObject = {
      id: tags._id._id,
      tag: tags._id.name,
    };
    tags.estRequirementData.forEach((tag, i) => {
      if (tag.ESTAttributeID !== undefined && tag.ESTAttributeID !== null) {
       
        // Normal Attribute
        if (tagObject[tag.ESTAttributeID._id] !== undefined && tagObject[tag.ESTAttributeID._id] !== null) {
          tagObject[tag.ESTAttributeID._id] = tagObject[tag.ESTAttributeID._id] + tag.ESTData;
        } else {
          tagObject[tag.ESTAttributeID._id] = tag.ESTData;
        }

        //Bottom
        if (attributeTotal[tag.ESTAttributeID._id] !== undefined && attributeTotal[tag.ESTAttributeID._id] !== null) {
          attributeTotal[tag.ESTAttributeID._id] = attributeTotal[tag.ESTAttributeID._id] + tag.ESTData;
        } else {
          attributeTotal[tag.ESTAttributeID._id] = tag.ESTData;
        }

        // Total - Normal Attribute
        if (tagObject["total"] !== undefined && tagObject["total"] !== null) {
          tagObject["total"] = tagObject["total"] + tag.ESTData;
        } else {
          tagObject["total"] = tag.ESTData;
        }

        if (attributeTotal["total"] !== undefined && attributeTotal["total"] !== null) {
          attributeTotal["total"] = attributeTotal["total"] + tag.ESTData;
        } else {
          attributeTotal["total"] = tag.ESTData;
        }

        //total_Contingency
        if (contingency > 0) {
          tagObject[tag.ESTAttributeID._id + contingencySuffix] = calculateContingency(tagObject[tag.ESTAttributeID._id], contingency);
          tagObject["total_Contingency"] = calculateContingency(tagObject["total"], contingency);
        }

        if (attributeTotal[tag.ESTAttributeID._id + contingencySuffix] !== undefined
          && attributeTotal[tag.ESTAttributeID._id + contingencySuffix] !== null) {
          attributeTotal[tag.ESTAttributeID._id + contingencySuffix] =
            attributeTotal[tag.ESTAttributeID._id + contingencySuffix] + calculateContingency(tag.ESTData, contingency);
        } else {
          attributeTotal[tag.ESTAttributeID._id + contingencySuffix] = calculateContingency(tag.ESTData, contingency);
        }

        attributeTotal["total_Contingency"] = calculateContingency(attributeTotal["total"], contingency);
     
      }
    });
       
 
    tagSummaryDataArray.push(tagObject);
  }
      
    });
  
  tagSummaryDataArray.push(attributeTotal);
  
  return tagSummaryDataArray;
 } catch (err) {
    //console.log("something went wrong: service > GetEstimation data", err);
    console.log(err.stack);
    throw new Error(err);
  }
 }


module.exports.getAttributesCalAttributesTotal = async (estHeaderId) => {
  var resourceCount = {
    estHeaderId: estHeaderId,
    EstimationAttributes: [
      {
        _id: "6177d49fb6e42413fe1baf18",
        attributeCode: "DEV",
        attributeName: "Front End",
        description: "name",
        Total: 265,
      },
      {
        _id: "6177dc8bb6e42413fe1baf24",
        attributeCode: "DEV",
        attributeName: "Back End",
        description: "Back End",
        Total: 115,
      },
    ],
    EstimationCalcAttributes: [
      {
        _id: "618b8f4b6259f87257bc2201",
        calcAttribute: " ",
        calcAttributeName: "QA",
        Total: 85,
      },
      {
        _id: "618b8f5f6259f87257bc2203",
        calcAttribute: " ",
        calcAttributeName: "ProjectManager",
        Total: 95,
      },
    ],
  };
  console.log("ResourceCount :", resourceCount);
  return resourceCount;
};


module.exports.getTagSummary = async (estHeaderId) => {


  return requirementDataForEstHeader(estHeaderId);


  
};




module.exports.getEstHeaderRequirement = async (estHeaderId) => {
  return requirementDataForEstHeader(estHeaderId);
};

async function requirementDataForEstHeader(estHeaderId) {
  let estHeaderRequirement = await EstHeaderRequirement.aggregate([
    {
      $match: {
        estHeader: ObjectId(estHeaderId),
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "estrequirementdatas",
        localField: "_id",
        foreignField: "ESTHeaderRequirementID",
        as: "attributeData",
      },
    },
    {
      $lookup: {
        from: "projectrequirements",
        localField: "requirement",
        foreignField: "_id",
        as: "requirementData",
      },
    },
    {
      $unwind: {
        path: "$requirementData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "requirementtypes",
        localField: "requirementData.type",
        foreignField: "_id",
        as: "requirementData.type",
      },
    },
    {
      $unwind: {
        path: "$requirementData.type",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "requirementtags",
        localField: "requirementData.tag",
        foreignField: "_id",
        as: "requirementData.tag",
      },
    },
    {
      $unwind: {
        path: "$requirementData.tag",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$attributeData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "estimationattributes",
        localField: "attributeData.ESTAttributeID",
        foreignField: "_id",
        as: "attributeData.ESTAttributeID",
      },
    },
    {
      $unwind: {
        path: "$attributeData.ESTAttributeID",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        isDeleted: {
          $first: "$isDeleted",
        },
        requirement: {
          $first: "$requirementData",
        },
        estHeader: {
          $first: "$estHeader",
        },
        estRequirementData: {
          $push: "$attributeData",
        },
      },
    },
    {
      $project: {
        _id: 1,
        isDeleted: 1,
        estRequirementData: 1,
        requirement: 1,
      },
    },
    {
      $lookup: {
        from: "queryassumptions",
        localField: "requirement._id",
        foreignField: "projectRequirement",
        as: "requirement.queryassumptions",
      },
    },
    {
      $sort: {
        "requirement.title": 1,
      },
    },
  ]);
  return estHeaderRequirement;
}
module.exports.getTagWiseRequirementForEstHeader = async (estHeaderId) => {
  return queryTagWiseRequirementForEstHeader(estHeaderId);
};
async function queryTagWiseRequirementForEstHeader(estHeaderId) {
  let estHeaderRequirement = await EstHeaderRequirement.aggregate([
    {
      $match: {
        estHeader: ObjectId(estHeaderId),
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: "estrequirementdatas",
        localField: "_id",
        foreignField: "ESTHeaderRequirementID",
        as: "attributeData",
      },
    },
    {
      $lookup: {
        from: "projectrequirements",
        localField: "requirement",
        foreignField: "_id",
        as: "requirementData",
      },
    },
    {
      $unwind: {
        path: "$requirementData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "requirementtypes",
        localField: "requirementData.type",
        foreignField: "_id",
        as: "requirementData.type",
      },
    },
    {
      $unwind: {
        path: "$requirementData.type",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "requirementtags",
        localField: "requirementData.tag",
        foreignField: "_id",
        as: "requirementData.tag",
      },
    },
    {
      $unwind: {
        path: "$requirementData.tag",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $unwind: {
        path: "$attributeData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "estimationattributes",
        localField: "attributeData.ESTAttributeID",
        foreignField: "_id",
        as: "attributeData.ESTAttributeID",
      },
    },
    {
      $unwind: {
        path: "$attributeData.ESTAttributeID",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        isDeleted: {
          $first: "$isDeleted",
        },
        requirement: {
          $first: "$requirementData",
        },
        estHeader: {
          $first: "$estHeader",
        },
        estRequirementData: {
          $push: "$attributeData",
        },
      },
    },
    {
      $project: {
        _id: 1,
        isDeleted: 1,
        estRequirementData: 1,
        requirement: 1,
      },
    },{
    $unwind: {
        path: '$estRequirementData',
        preserveNullAndEmptyArrays: true
    }
    },
    {
    $group: {
        _id: '$requirement.tag',
        estRequirementData: {
            $push: '$estRequirementData'
        }
    }
    }, {
      $sort: {
        '_id.name': 1
      }
    }
  ]);
  return estHeaderRequirement;
}
module.exports.getRequirementWithQuery = async (projectId) => {
  let projectRequirement = await ProjectRequirement.aggregate([
    {
      $match: {
        project: ObjectId(projectId),
      },
    },
    {
      $lookup: {
        from: "queryassumptions",
        localField: "_id",
        foreignField: "projectRequirement",
        as: "queryassumptions",
      },
    },
    {
      $unwind: {
        path: "$queryassumptions",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "requirementtypes",
        localField: "type",
        foreignField: "_id",
        as: "type",
      },
    },
    {
      $unwind: {
        path: "$type",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "requirementtags",
        localField: "tag",
        foreignField: "_id",
        as: "tag",
      },
    },
    {
      $unwind: {
        path: "$tag",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        id: {
          $first: "$_id",
        },
        isDeleted: {
          $first: "$isDeleted",
        },
        Requirement: {
          $first: "$title",
        },
        Description: {
          $first: "$description",
        },
        Tagid: {
          $first: "$tag._id",
        },
        Tag: {
          $first: "$tag.name",
        },
        Type: {
          $first: "$type.name",
        },
        Typeid: {
          $first: "$type._id",
        },
        requirementId: {
          $first: "$_id",
        },
        Query: {
          $first: "$queryassumptions.query",
        },
        Assumption: {
          $first: "$queryassumptions.assumption",
        },
        Reply: {
          $first: "$queryassumptions.reply",
        },
        queryassumptionsId: {
          $first: "$queryassumptions._id",
        },
      },
    },
  ]);

  if (projectRequirement.length != 0) {
    return projectRequirement;
  } else {
    return [];
  }
};
