const estimationRequirementService = require("./estimationRequirementService");
const ExcelJS = require("exceljs");
const constant = require("../constant/index");

const generateSpreadsheet = async (colHeader, row, sheetName, workbook) => {
  const worksheet = workbook.addWorksheet(sheetName);
  worksheet.columns = colHeader;
  worksheet.addRows(row);
};

module.exports.requiredData = async (conditions) => {
  //estimationDetail
  const payload = { id: conditions.estimationHeaderId };
  const requirementData = await estimationRequirementService.getRequirementData(
    payload
  );
  console.log(
    "requirementData",
    requirementData.estHeaderAttribute,
    requirementData.requirementList
  );

  var estHeaderAttribute = [
    {
      header: "Requirement",
      key: "Requirement",
      width: 20,
    },
    {
      header: "Tag",
      key: "Tag",
      width: 20,
    },
    {
      header: "Description",
      key: "Description",
      width: 40,
    },
  ];

  estHeaderAttribute = estHeaderAttribute.concat(
    requirementData.estHeaderAttribute.map((el) => {
      return { header: el.headerName, key: el.id };
    })
  );

  const requirementDataArrayList = requirementData.requirementList;

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Estimation";
  workbook.created = new Date();

  await generateSpreadsheet(
    estHeaderAttribute,
    requirementDataArrayList,
    constant.excelSheetName.ESTIMATION_DETAIL,
    workbook
  );

  workbook.xlsx.writeFile("./report/Estimation.xlsx");
};
