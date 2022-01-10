const constant = require("../constant");
const ExcelJS = require('exceljs');
const { formatMongoData } = require("../helper/dbhelper");

const RequirementRepository = require("../repository/requirementRepository");

module.exports.uploadExcel = async (projectId,excelFile) => {
  try {


    console.log(projectId);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(excelFile.file.data);
      var headerAddress = {};
      var record_list = [];
    workbook._worksheets.forEach( (worksheet) => {
      console.log(worksheet.name);
      var index = 0; 
      worksheet._rows.forEach( (row) => {
        if (isValidRow(row)) {
          if (index == 0) {
            headerAddress = getHeaderAddress(row);
          } else {
            record_list.push(getRecords(projectId,index,row, headerAddress));
          }
        }
           index = index + 1;
      });
    });
    //Add error

    let response = { ...constant.requirementListResponse };
    response.featureList = record_list;
    response.requirementSummary = recordSummary(record_list);
    
    console.log(response);
     return formatMongoData(response);
  } catch (err) {
    throw new Error(err);
  }
};

const getHeaderAddress = (row) => {
  
    var headerAddress = {
        "Requirement": "A",
        "Description": "B",
        "Tag": "C",
        "Type": "D",
        "Query": "E",
        "Assumption": "F"
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
    if (cell._value.model.value !== undefined) {
      isValid = true;
          }

        });

  return isValid;
};

const getRecords =  (projectId,id,row,headerAddress) => {
  var record = {
                "id":id,
                 "Requirement": "",
                 "Description": "",
                 "Tag": "",
                 "Type": "",
                 "Query": "",
                 "Assumption": "",
                 "Error" : []
              };
        row._cells.forEach(async (cell) => {
         console.log(columName(cell._address), " --> ", cell._value.model.value);
          switch(columName(cell._address)) {
            case headerAddress.Requirement:
              if (cell._value.model.value === undefined) {
                record.Error.push(constant.excelUploadMessage.REQUIREMENT_NOTFOUND_REQUIREMENT);
              } else {

                record.Requirement = cell._value.model.value;
                var isAvailable = await RequirementRepository.isRequirementAvailable(projectId, cell._value.model.value);
                if (isAvailable) {
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
              record.Tag = cell._value.model.value;
              break;
            case constant.Type:
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



const recordSummary =  (records) => {
 
       var numberOfError = 0;
        records.forEach(async (record) => {
          numberOfError = numberOfError + record.Error.length;
        });
   
      var summary = {
        "noOfRecords": records.length,
        "noOfError": numberOfError,
        "noOfModification": 0,
        "noOfRecordsInserted":0 
        }
  return summary;
};





const columName = (_address) =>{
  return _address.replace(/[0-9]/g, '');
};