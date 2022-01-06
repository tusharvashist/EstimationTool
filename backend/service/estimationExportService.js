const estimationRequirementService = require("./estimationRequirementService");
const resourceCountMixService = require("./resourceMixService");

const ExcelJS = require("exceljs");
const constant = require("../constant/index");

const generateSpreadsheet = async (colHeader, row, sheetName, workbook) => {
  const worksheet = workbook.addWorksheet(sheetName);
  worksheet.columns = colHeader;
  worksheet.addRows(row);
};

// module.exports.requiredData = async (conditions) => {
//   //estimationDetail
//   const payload = { id: conditions.estimationHeaderId };
//   const requirementData = await estimationRequirementService.getRequirementData(
//     payload
//   );
//   console.log(
//     "requirementData",
//     requirementData.estHeaderAttribute,
//     requirementData.requirementList
//   );

//   var estHeaderAttribute = [
//     {
//       header: "Requirement",
//       key: "Requirement",
//       width: 20,
//     },
//     {
//       header: "Tag",
//       key: "Tag",
//       width: 20,
//     },
//     {
//       header: "Description",
//       key: "Description",
//       width: 40,
//     },
//   ];

//   estHeaderAttribute = estHeaderAttribute.concat(
//     requirementData.estHeaderAttribute.map((el) => {
//       return { header: el.headerName, key: el.id };
//     })
//   );

//   const requirementDataArrayList = requirementData.requirementList;

//   const workbook = new ExcelJS.Workbook();
//   workbook.creator = "Estimation";
//   workbook.created = new Date();

//   await generateSpreadsheet(
//     estHeaderAttribute,
//     requirementDataArrayList,
//     constant.excelSheetName.ESTIMATION_DETAIL,
//     workbook
//   );

//   workbook.xlsx.writeFile("./report/Estimation.xlsx");
// };

module.exports.generateExcelReport = async (reportPayload) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Estimation";
  workbook.created = new Date();

  await generateRequiredSpreadsheet(workbook, reportPayload);

  try {
    workbook.xlsx.writeFile("./report/Estimation.xlsx").then(() => {
      return true;
    });
  } catch (err) {
    console.log("Workbok Error + err" + err);
  }
};

async function generateRequiredSpreadsheet(workbook, reportPayload) {
  if (getReportFlagValue("estimationDetail", reportPayload)) {
    const worksheet = workbook.addWorksheet("Estimation Detail");
    worksheet.columns = (
      await getEstimationRequirementData(reportPayload)
    ).estRequirementColumns;
    worksheet.addRows(
      (await getEstimationRequirementData(reportPayload)).estRequirementRowData
    );
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
  }

  if (getReportFlagValue("estimationSummary", reportPayload)) {
  }

  if (getReportFlagValue("resourceCount", reportPayload)) {
  }

  if (getReportFlagValue("resourcePlanning", reportPayload)) {
    const worksheet = workbook.addWorksheet("Resource Planning");
    worksheet.columns = getResourcePlanningColumns();
    worksheet.addRows(
      await getResourcePlanningRowData(reportPayload.estimationHeaderId)
    );
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });
  }

  if (getReportFlagValue("resourceTimeline", reportPayload)) {
  }
}

function getResourcePlanningColumns() {
  var resPlanningHeaderAttr = [
    { header: "S No.", key: "s_no", width: 10 },
    { header: "Allocation%", key: "allocation", width: 15 },
    { header: "Role", key: "role", width: 30 },
    { header: "Skills(Effort & Summary Attributes)", key: "skill", width: 30 },
    { header: "Cost/Hr($)", key: "cost", width: 20 },
    { header: "Price/Hr($)", key: "price", width: 20 },
    { header: "Cost($)", key: "cost_cal", width: 20 },
    { header: "Price($)", key: "price_cal", width: 20 },
  ];
  return resPlanningHeaderAttr;
}

async function getResourcePlanningRowData(estinationHeaderId) {
  const payload = { id: estinationHeaderId };
  const resData = await resourceCountMixService.getResourceMixPlanning(payload);
  console.log("Resoure Planning data", resData);
  var resPlanningColumnData = resData.resourceMixData.map((e, i) => {
    return {
      s_no: i + 1,
      allocation: e.resourceMix.allocationPercent,
      role: e.resourceMix.role.resourceRole,
      skill: e.attributeName,
      cost: e.resourceMix.role.cost,
      price: e.resourceMix.role.price,
      cost_cal: e.costcal,
      price_cal: e.pricecal,
    };
  });

  return resPlanningColumnData;
}

function getResourceCountMixColumns() {
  var resCountHeaderAttr = [
    { header: "S NO.", key: "s_no", width: 20 },
    { header: "Resource Count", key: "resource_count", width: 20 },
    { header: "Skills(Effort & Summary Attributes)", key: "skill", width: 40 },
    { header: "Technology", key: "technology", width: 40 },
    { header: "Role", key: "role", width: 40 },
  ];
  return resCountHeaderAttr;
}

function getReportFlagValue(key, reportPayload) {
  const foundElement = reportPayload.reports.find(
    (element) => element.key === key
  );
  return foundElement.value;
}

async function getEstimationRequirementData(conditions) {
  let estRequirementColumns, estRequirementRowData;

  const payload = { id: conditions.estimationHeaderId };
  const requirementData = await estimationRequirementService.getRequirementData(
    payload
  );

  estRequirementColumns = [
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

  estRequirementColumns = estRequirementColumns.concat(
    requirementData.estHeaderAttribute.map((el) => {
      return { header: el.headerName, key: el.id };
    })
  );

  estRequirementRowData = requirementData.requirementList;

  // return values
  return {
    estRequirementColumns,
    estRequirementRowData,
  };
}
