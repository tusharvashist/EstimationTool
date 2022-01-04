const estimationRequirementService = require("./estimationRequirementService");
const ExcelJS = require("exceljs");

function generateSpreadsheet(colHeader, row) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Estimation";
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet("Estimation Detail");

  worksheet.columns = colHeader;

  worksheet.addRows(row);

  workbook.xlsx.writeFile("./report/Estimation.xlsx");
}

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

  console.log("estHeaderAttribute", estHeaderAttribute);

  const requirementDataArrayList = requirementData.requirementList;

  console.log("requirementDataArrayList", requirementDataArrayList);

  generateSpreadsheet(estHeaderAttribute, requirementDataArrayList);
};
