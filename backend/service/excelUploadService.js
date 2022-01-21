const constant = require("../constant");
const ExcelJS = require('exceljs');
const { formatMongoData } = require("../helper/dbhelper");

const RequirementRepository = require("../repository/requirementRepository");

module.exports.uploadExcel = async (projectId,excelFile) => {
  try {
    var allProjectRequirement = await RequirementRepository.getAllProjectRequirement(projectId);
      var tags = await RequirementRepository.getTags();
    var type = await RequirementRepository.getTypes();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(excelFile.file.data);
    let response = { ...constant.requirementListResponse };
       let excelImportStatus = { ...constant.importRequirementStatus };
    readExcelRecords(projectId, allProjectRequirement ,tags,type,workbook,  (record_list) => { 
        response.featureList =  isDuplicate(record_list);
        response.requirementSummary =  recordSummary(excelImportStatus.importFile, record_list);
        console.log(response);
    })

  return formatMongoData(response);
  } catch (err) {
    throw new Error(err);
  }
};

const readExcelRecords = (projectId, allProjectRequirement,tags,type, workbook, callBack) => {
  var record_list = [];
  var sheetNo = 0;
  workbook._worksheets.forEach((worksheet) => {
    if (sheetNo === 0) {
      sheetNo = sheetNo + 1;
    
    var index = -1;
    var totalRecordExecuted = 0;
    worksheet._rows.forEach((row) => {
  
        index = index + 1;
        if (index == 0) {
          headerAddress = getHeaderAddress(row);
        } else {
        if (isValidRow(row)) {
          var record = getRecords(projectId, allProjectRequirement,tags,type, index, row, headerAddress)
          record_list.push(record);
        }
      }
      totalRecordExecuted = totalRecordExecuted + 1
      if (totalRecordExecuted >= worksheet._rows.length - 1) {
        callBack(record_list);
      }
    });
    }
  
  });
  
  
};

const getHeaderAddress = (row) => {
    var headerAddress = {
        "Requirement": "",
        "Description": "",
        "Tag": "",
        "Type": "",
        "Query": "",
        "Assumption": ""
    };
        row._cells.forEach( (cell) => {
         console.log(columName(cell._address), " --> ", cell._value.model.value);
          switch(cell._value.model.value) {
            case constant.requirementExcelHeader.Requirement:
              headerAddress.Requirement = columName(cell._address);
              break;
            case constant.requirementExcelHeader.Description:
              headerAddress.Description = columName(cell._address);
              break;
            case constant.requirementExcelHeader.Tag:
              headerAddress.Tag = columName(cell._address);
              break;
            case constant.requirementExcelHeader.Type:
              headerAddress.Type = columName(cell._address);
              break;
            case constant.requirementExcelHeader.Query:
               headerAddress.Query = columName(cell._address);
              break;
            case constant.requirementExcelHeader.Assumption:
              headerAddress.Assumption = columName(cell._address);
              break;
            case constant.requirementExcelHeader.Reply:
              headerAddress.Reply = columName(cell._address);
             break;
           default:
            break;
          }
        });
  return headerAddress;
};

const isValidRow = (row) => {
  var isValid = false;
  row._cells.forEach((cell) => {
    var isOnCorrectCell = false;
    switch(columName(cell._address)) {
            case headerAddress.Requirement:
            isOnCorrectCell = true;
              break;
            case headerAddress.Description:
             isOnCorrectCell = true;  
              break;
            case headerAddress.Tag:
              isOnCorrectCell = true;
              break;
            case headerAddress.Type:
               isOnCorrectCell = true;
              break;
            case headerAddress.Query:
                isOnCorrectCell = true;
              break;
            case headerAddress.Assumption:
             isOnCorrectCell = true;
              break;
            case headerAddress.Reply:
              isOnCorrectCell = true;
             break;
            default:
             isOnCorrectCell = false;
            break;
          }
if(isOnCorrectCell === true){
    if (cell._value.model.value !== undefined) {
      isValid = true;
    }
}
        });
  return isValid;
};

const isRequirementAvailable = (allProjectRequirement, title) => {
  var isAvailable = false
  allProjectRequirement.forEach((projectRequirement) => {
    if (projectRequirement.title === title) {
      isAvailable = true;
    }
  });
  return isAvailable;
};

const isTagTypeAvailable = (tag_list, title) => {
  if (title.length == 0) {
    return false
  }
  var isAvailable = false
  tag_list.forEach((tag) => {
    if (tag.name === title) {
      isAvailable = true;
    }
  });
  return isAvailable;
};

const getTagTypeId = (tag_list, title) => {
  if (title.length == 0) {
    return 0
  }
  var id = 0
  tag_list.forEach((tag) => {
    if (tag.name === title) {
      id = tag._id;
    }
  });
  return id;
};

const isDuplicate = (record_list) => {
  var isAvailable = false;
  var mainList = record_list;
  var subList = record_list;
  mainList.forEach((record) => {
    subList.forEach((checkRecord) => {
      if (record.id < checkRecord.id) {
        if (record.Requirement !== undefined) {
          if (record.Requirement === checkRecord.Requirement) {
            checkRecord.Error.push(constant.excelUploadMessage.REQUIREMENT_DUPLICATE + record.id);
          }
        }
      }
    });
  });
  return subList;
};

const getRecords =  (projectId,allProjectRequirement,tags,type, id,row,headerAddress) => {
  var record = {
    "id": id,
                "isDeleted" : false,
                 "Requirement": "",
                 "Description": "",
                 "Tag": "",
                 "TagId": "",
                 "Type": "",
                 "TypeId":"",
                 "Query": "",
                 "Assumption": "",
                 "Error" : []
              };
        row._cells.forEach( (cell) => {
          switch(columName(cell._address)) {
            case headerAddress.Requirement:
              if (cell._value.model.value === undefined) {
                record.Error.push(constant.excelUploadMessage.REQUIREMENT_NOTFOUND_REQUIREMENT);
              } else {
                record.Requirement = cell._value.model.value;
                if (isRequirementAvailable(allProjectRequirement, cell._value.model.value)) {
                   record.Error.push(constant.excelUploadMessage.REQUIREMENT_ALREADY_AVAILABLE);
                }
               
              }
              break;
            case headerAddress.Description:
              if (cell._value.model.value === undefined) {
                   record.Error.push(constant.excelUploadMessage.REQUIREMENT_NOTFOUND_Description);
              } else {  
                  record.Description = cell._value.model.value;
              }
              break;
            case headerAddress.Tag:

                    if ( cell._value.model.value != undefined && !isTagTypeAvailable(tags, cell._value.model.value)) {
                   record.Error.push(constant.excelUploadMessage.REQUIREMENT_INVALID_TAGS);
                }
              record.Tag = cell._value.model.value;
              break;
            case headerAddress.Type:
               if (cell._value.model.value != undefined && !isTagTypeAvailable(type, cell._value.model.value)) {
                   record.Error.push(constant.excelUploadMessage.REQUIREMENT_INVALID_TYPE);
                }
              record.Type = cell._value.model.value;
              break;
            case headerAddress.Query:
               record.Query = cell._value.model.value;
              break;
            case headerAddress.Assumption:
              record.Assumption = cell._value.model.value;
              break;
            case headerAddress.Reply:
              record.Reply = cell._value.model.value;
             break;
           default:
            break;
          }
        });
  return record;
};

const recordSummary =  (action,records) => {
       var numberOfError = 0;
  records.forEach((record) => {
    if (record.Error !== undefined) {
          numberOfError = numberOfError + record.Error.length;
          }
        });
   
      var summary = {
        "noOfRecords": records.length,
        "noOfError": numberOfError,
        "noOfModification": 0,
        "noOfRecordsInserted": 0 ,
        "noOfModification": 0,
        "action":action
        }
  return summary;
};

const columName = (_address) =>{
  return _address.replace(/[0-9]/g, '');
};

const updateRecordsValidation = (onSave, projectId, allProjectRequirement, tags,type, updatedRecords, callBack) => {
  var record_list = [];
  var index = 0;
  var totalRecordExecuted = 0;
  updatedRecords.forEach((row) => {
    var isDeleted = false;
    if (!onSave) {
      if (row.isDeleted) {
        isDeleted = true;
      }
    }

    if (isDeleted == false) {
      index = index + 1;
      var record = updatedRowRecord(projectId, allProjectRequirement, tags, type, index, row)
      record_list.push(record);
    }
    totalRecordExecuted = totalRecordExecuted + 1
        if (totalRecordExecuted >= (updatedRecords.length - 1)) {
          callBack(record_list);
        }
      }
    );
};

const updatedRowRecord =  (projectId,allProjectRequirement,tags,type, id,row) => {
  try {
    var record = {
        
      "id": id,
      "isDeleted" : false,
                 "Requirement": "",
                 "Description": "",
                 "Tag": "",
                 "TagId": "",
                 "Type": "",
                 "TypeId":"",
                 "Query": "",
                 "Assumption": "",
                 "Error" : []
      };
    
              if (row.Requirement === undefined || row.Requirement.length === 0) {
                record.Error.push(constant.excelUploadMessage.REQUIREMENT_NOTFOUND_REQUIREMENT);
              } else {
                record.Requirement = row.Requirement;
                if (isRequirementAvailable(allProjectRequirement, row.Requirement)) {
                   record.Error.push(constant.excelUploadMessage.REQUIREMENT_ALREADY_AVAILABLE);
                }
              }

              if (row.Description  === undefined || row.Description.length === 0) {
                   record.Error.push(constant.excelUploadMessage.REQUIREMENT_NOTFOUND_Description);
              } else {  
                  record.Description = row.Description ;
              }
  
  
    if (row.Tag !== undefined) {
      if (row.Tag.length !== 0) {
        if (!isTagTypeAvailable(tags, row.Tag)) {
          record.Error.push(constant.excelUploadMessage.REQUIREMENT_INVALID_TAGS);
          record.Tag = row.Tag;
        } else {
          record.Tag = row.Tag;
          record.TagId = getTagTypeId(tags, row.Tag);
        }
      }
                 } else {
                    record.Tag = row.Tag;
                }
    
    if (row.Type !== undefined) {
      if (row.Type.length !== 0) {
        if (!isTagTypeAvailable(type, row.Type)) {
          record.Error.push(constant.excelUploadMessage.REQUIREMENT_INVALID_TYPE);
          record.Type = row.Type;
        } else {
          record.Type = row.Type;
          record.TypeId = getTagTypeId(type, row.Type);
        }
      }
          } else {
      
              record.Type = row.Type ;
    }
              record.Query = row.Query ;
              record.Assumption = row.Assumption ;
              record.Reply = row.Reply ;

    return record;
    } catch (err) {
    throw new Error(err);
  }
};

module.exports.updateRecord = async (projectId,payLoad) => {
  try {
    var allProjectRequirement = await RequirementRepository.getAllProjectRequirement(projectId);
    var tags = await RequirementRepository.getTags();
    var type = await RequirementRepository.getTypes();
    var updatedRecord = payLoad.updated;
    var original = payLoad.original;
     let excelImportStatus = { ...constant.importRequirementStatus };
    var response = validateRecord(false, projectId, excelImportStatus.updateData , allProjectRequirement, tags, type, updatedRecord);
  //  response.requirementSummary.noOfModification = getNoUpdatedRecords(original,response.featureList)
  return formatMongoData(response);
  } catch (err) {
    throw new Error(err);
  }
};
const getNoUpdatedRecords = (original, updatedRecord) => {
  let result = original.filter(o1 => updatedRecord.some(o2 => o1.id === o2.id));
  //const results = original.filter(({ value: id1 }) => !updatedRecord.some(({ value: id2 }) => id2 === id1));
  return result.count;
}
const validateRecord = (onSave , projectId, status, allProjectRequirement,tags,type, recordList) => {
  try {
  let response = { ...constant.requirementListResponse };
  updateRecordsValidation(onSave, projectId, allProjectRequirement,tags,type, recordList, (record_list) => {
    response.featureList = isDuplicate(record_list);
    response.requirementSummary = recordSummary(status,record_list);
  });
  
    return response
    } catch (err) {
    throw new Error(err);
  }
};

const getQueryAssumptionList = (projectRequirement_list, recordList) => {
  var queryAssumptionList = [];
  recordList.forEach((requirement) => { 
    if (requirement.Query !== undefined && requirement.Assumption !== undefined && requirement.Reply !== undefined) {
      if (requirement.Query.length !== 0 || requirement.Assumption.length !== 0 || requirement.Reply.length !== 0) {
     
        var queryAssumption = requirement;
        projectRequirement_list.forEach((projectRequirement) => {
          if (projectRequirement.title == requirement.Requirement) {
            queryAssumption["_id"] = projectRequirement._id;
          }
        });
        queryAssumptionList.push(queryAssumption);
      }
    }
  });
  return queryAssumptionList;
  
}

module.exports.validateSave = async (projectId,estHeaderId,recordList) => {
  try {
    var project = await RequirementRepository.getProjectById(projectId);
    var allProjectRequirement = await RequirementRepository.getAllProjectRequirement(projectId);
    var tags = await RequirementRepository.getTags();
    var type = await RequirementRepository.getTypes();
         let excelImportStatus = { ...constant.importRequirementStatus };
    var response = validateRecord(true, projectId,excelImportStatus.insertSuccess, allProjectRequirement,tags,type, recordList);
    if (response.requirementSummary.noOfError === 0) {
      var result = await RequirementRepository.createBulkRequirement(project, recordList);
      response.requirementSaveResult = result;
      var projectRequirement_list = await RequirementRepository.getAllProjectRequirement(projectId);
      //Map req with 
      var queryAssumptionList = await getQueryAssumptionList(projectRequirement_list, recordList);
      //Insert //bulkInsertQueryAssumption
      if(queryAssumptionList.length >0){

        await RequirementRepository.bulkInsertQueryAssumption(queryAssumptionList);
      }
    
     // response.requirementSummary = result;

  
      response.requirementSummary.noOfRecordsInserted = result.nInserted;
      if (result.nInserted === 0) {
        response.requirementSummary.action = excelImportStatus.insertFail;
      }
      if (estHeaderId != 0) {
        var requirementIds = [];
           for (const [key, value] of Object.entries(result.insertedIds)) {
              requirementIds.push(String(value));
             }
         await RequirementRepository.mapHeaderToMultipleRequirement(estHeaderId, requirementIds);        
      }
    } else {
      response.requirementSummary.action = excelImportStatus.insertFail;
    }
    console.log(response);
     return formatMongoData(response);
  } catch (err) {
    throw new Error(err);
  }
};