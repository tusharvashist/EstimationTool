const estimationRequirementService = require("./estimationRequirementService");
const resourceCountMixService = require("./resourceMixService");
const estimationHeaderModal = require("../database/models/estHeaderModel");
const estimationResourceCountService = require("./estimationResourceCountService");
const estTimelinePlanningServive = require("./timelinePlanningService");

const ExcelJS = require("exceljs");
const constant = require("../constant/index");
// include node fs module
var fs = require("fs");
const { throws } = require("assert");
const { string } = require("joi");
const { error } = require("console");

module.exports.generateExcelReport = async (reportPayload) => {
  //Get Estimation Name
  let est = await this.checkEstName(reportPayload);

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Estimation";
  workbook.created = new Date();

  //check report directory if not exist, create one
  await createDirIfNotExist();
  // delete old file if exist
  await deleteFile(est.estName);

  try {
    await generateRequiredSpreadsheet(workbook, reportPayload);
    const Promise1 = workbook.xlsx.writeFile(
      `./report/Estimation_${est.estName}.xlsx`
    );
    Promise1.then(() => {
      return true;
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

async function generateRequiredSpreadsheet(workbook, reportPayload) {
  if (getReportFlagValue("estimationDetail", reportPayload)) {
    const worksheet = workbook.addWorksheet(
      constant.excelSheetName.ESTIMATION_DETAIL
    );
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
    const worksheet = workbook.addWorksheet(
      constant.excelSheetName.ESTIMATION_SUMMARY
    );

    worksheet.properties.defaultColWidth = 20;

    let colTagData = (await getEstimationRequirementData(reportPayload))
      .estTagColumns;

    let colSummaryData = (await getEstimationRequirementData(reportPayload))
      .estCalColumns;

    worksheet.addTable({
      name: "MyTable",
      ref: "A1",
      style: {
        theme: "TableStyleMedium6",
        showRowStripes: true,
      },
      columns: colTagData,
      rows: (await getEstimationRequirementData(reportPayload)).estTagRowData,
    });

    worksheet.addTable({
      name: "MyTable2",
      ref: `A${worksheet.rowCount + 5}`,
      headerRow: true,
      style: {
        theme: "TableStyleMedium6",
        showRowStripes: true,
      },
      columns: colSummaryData,
      rows: (await getEstimationRequirementData(reportPayload)).estCalRowData,
    });
  }

  if (getReportFlagValue("resourceCount", reportPayload)) {
    let newPayload = { estheaderid: reportPayload.estimationHeaderId };

    const worksheet = workbook.addWorksheet(
      constant.excelSheetName.RESOURCE_MIX
    );

    // set column width
    worksheet.properties.defaultColWidth = 20;
    let countRowData = await estimationResourceCountService.getResourceCount(
      newPayload
    );

    let colData = [
      { name: "S No.", key: "s_no", width: 3 },
      //{ name: "Resource Count", key: "resourceCount", width: 15 },
      {
        name: "Skills(Effort & Summary Attributes)",
        key: "skill",
        width: 40,
      },
      { name: "Technologies", key: "techskills", width: 20 },
      { name: "Role", key: "role", width: 30 },
    ];

    const getRoleCountString = (arr) => {
      let newArr = [];
      arr.forEach((el) => newArr.push(`${el.count} ${el.resourceRole}`));
      return newArr.toString();
    };

    let tableRowData = countRowData.map((data, i) => {
      return [
        i + 1,
        //data.resourceCount,
        data.attributeName,
        data.skills,
        getRoleCountString(data.rolecount),
      ];
    });

    worksheet.addTable({
      name: "MyTable",
      ref: "A1",
      headerRow: true,
      style: {
        theme: "TableStyleMedium6",
        showRowStripes: true,
      },
      columns: colData,
      rows: tableRowData,
    });
  }

  if (getReportFlagValue("resourcePlanning", reportPayload)) {
    const worksheet = workbook.addWorksheet("Resource Planning");
    worksheet.columns = getResourcePlanningColumns();
    var rowData = await getResourcePlanningRowData(
      reportPayload.estimationHeaderId
    );
    worksheet.addRows(rowData.resPlanningRowData);
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    if (rowData.resPlanningRowData.length > 0) {
      // Insert a row by sparse Array
      var rowValuesTotalCost = [];
      rowValuesTotalCost[6] = "Total";
      rowValuesTotalCost[7] = rowData.totalCost;
      rowValuesTotalCost[8] = rowData.totalPrice;
      worksheet.insertRow(worksheet.rowCount + 1, rowValuesTotalCost);

      var rowValuesMargin = [];
      rowValuesMargin[6] = "Margin";
      rowValuesMargin[7] = rowData.margin;
      worksheet.insertRow(worksheet.rowCount + 1, rowValuesMargin);

      var rowValuesMarginPercent = [];
      rowValuesMarginPercent[6] = "Margin %";
      rowValuesMarginPercent[7] = rowData.marginPercent;
      worksheet.insertRow(worksheet.rowCount + 1, rowValuesMarginPercent);
    }
  }

  if (getReportFlagValue("resourceTimeline", reportPayload)) {
    const worksheet = workbook.addWorksheet("Timeline Planning");
    var resData = await getTimelinePlanningData(
      reportPayload.estimationHeaderId
    );
    worksheet.columns = resData.columnData;
    worksheet.addRows(resData.rowData);
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    if (resData.rowData.length > 0) {
      // Insert a row by sparse Array
      var rowValuesTotalHour = [];
      rowValuesTotalHour[resData.columnData.length - 1] = "G. Total Hours";
      rowValuesTotalHour[resData.columnData.length] = resData.totalHour;
      worksheet.insertRow(worksheet.rowCount + 2, rowValuesTotalHour);
    }
  }
}

function getResourcePlanningColumns() {
  return [
    { header: "S No.", key: "s_no", width: 5 },
    { header: "Allocation%", key: "allocation", width: 13 },
    { header: "Role", key: "role", width: 12 },
    { header: "Skills(Effort & Summary Attributes)", key: "skill", width: 25 },
    { header: "Unit Cost/Hr($)", key: "cost", width: 12 },
    { header: "Unit Price/Hr($)", key: "price", width: 12 },
    { header: "Total Cost($)", key: "cost_cal", width: 12 },
    { header: "Total Price($)", key: "price_cal", width: 12 },
  ];
}

async function getResourcePlanningRowData(estinationHeaderId) {
  const payload = { id: estinationHeaderId };
  const resData = await resourceCountMixService.getResourceMixPlanning(payload);
  var totalCost = resData.total.cost;
  var totalPrice = resData.total.price;
  var margin = resData.margin;
  var marginPercent = resData.marginPercent;

  var resPlanningRowData = resData.resourceMixData.map((e, i) => {
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

  return { resPlanningRowData, totalCost, totalPrice, margin, marginPercent };
}

function getReportFlagValue(key, reportPayload) {
  const foundElement = reportPayload.reports.find(
    (element) => element.key === key
  );
  return foundElement.value;
}

async function getEstimationRequirementData(conditions) {
  let estRequirementColumns,
    estRequirementRowData,
    estTagColumns,
    estTagRowData,
    estCalColumns,
    estCalRowData;

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

  estTagColumns = requirementData.tagSummaryHeader.map((el) => {
    return {
      name: el.headerName === "" ? "Tag" : el.headerName,
      key: el.id === 1 ? "tag" : el.field,
      width: 20,
    };
  });
  estTagRowData = requirementData.tagSummaryData.map((el) => {
    let rowDataArr = [];
    estTagColumns.map((item) => {
      rowDataArr.push(el[item.key]);
    });
    return rowDataArr;
  });

  estCalColumns = requirementData.summaryCallHeader.map((el) => {
    return {
      name: el.headerName,
      key: el.field,
      width: 20,
    };
  });
  estCalRowData = requirementData.summaryCalData.map((el) => {
    let rowDataArr = [];
    estCalColumns.map((item) => {
      return rowDataArr.push(el[item.key]);
    });
    return rowDataArr;
  });

  // return values
  return {
    estRequirementColumns,
    estRequirementRowData,
    estTagColumns,
    estTagRowData,
    estCalColumns,
    estCalRowData,
  };
}

async function getTimelinePlanningData(estinationHeaderId) {
  const payload = { id: estinationHeaderId };
  var totalHour;
  var rowData = [];
  var columnData = [
    {
      key: "id",
      header: "S No.",
      width: 5,
    },
    {
      key: "resourceRole",
      header: "Role",
      width: 12,
    },
    {
      key: "attributeName",
      header: "Skills(Effort & Summary Attributes)",
      width: 25,
    },
  ];
  const resData = await estTimelinePlanningServive.getTimelinePlanning(payload);
  totalHour = resData.totalNumberOfHours;
  rowData = resData.timelinePlanning;

  if (resData.resourceMixData.length > 0) {
    var timeline =
      resData.resourceMixData[0].estimationHeader.estTentativeTimeline;
    for (let i = 1; i <= timeline; i++) {
      const col = {};
      col.key = "week" + i.toString();
      col.header = "Week" + i.toString();
      col.width = 12;
      columnData.push(col);
    }
  }
  columnData.push({
    key: "totalHours",
    header: "Total Hours",
    width: 12,
  });

  return { columnData, totalHour, rowData };
}

module.exports.checkEstName = async (reqPayload) => {
  try {
    return estimationHeaderModal.findById(
      reqPayload.estimationHeaderId,
      "estName"
    );
  } catch (err) {
    throw new Error("Sorry, File not found for this estimation!");
  }
};

async function deleteFile(name) {
  try {
    // delete file if already exists
    if (fs.existsSync(`./report/Estimation_${name}.xlsx`)) {
      fs.unlinkSync(`./report/Estimation_${name}.xlsx`);
    }
  } catch (err) {}
}

async function createDirIfNotExist() {
  var dir = `./report`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return true;
}
