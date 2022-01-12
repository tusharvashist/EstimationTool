const estimationRequirementService = require("./estimationRequirementService");
const resourceCountMixService = require("./resourceMixService");
const estimationHeaderModal = require("../database/models/estHeaderModel");
const estimationResourceCountService = require("./estimationResourceCountService");

const ExcelJS = require("exceljs");
const constant = require("../constant/index");
// include node fs module
var fs = require("fs");
const { throws } = require("assert");
const { string } = require("joi");

module.exports.generateExcelReport = async (reportPayload) => {
  //Get Estimation Name
  let est = await this.checkEstName(reportPayload);

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Estimation";
  workbook.created = new Date();

  // delete old file if exist
  deleteFile(est.estName);

  try {
    await generateRequiredSpreadsheet(workbook, reportPayload);
    const Promise1 = workbook.xlsx.writeFile(
      `./report/Estimation_${est.estName}.xlsx`
    );
    Promise1.then(() => {
      return true;
    });
  } catch (err) {
    console.log("Workbok Error + err" + err);
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

    console.log(
      "colTagData",
      colTagData,
      "****",
      "row",
      (await getEstimationRequirementData(reportPayload)).estTagRowData
    );

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

    // worksheet.columns = (
    //   await getEstimationRequirementData(reportPayload)
    // ).estTagColumns;
    // worksheet.addRows(
    //   (await getEstimationRequirementData(reportPayload)).estTagRowData
    // );
    // worksheet.getRow(1).eachCell((cell) => {
    //   cell.font = { bold: true };
    // });
  }

  if (getReportFlagValue("resourceCount", reportPayload)) {
    let newPayload = { estheaderid: reportPayload.estimationHeaderId };

    const worksheet = workbook.addWorksheet(
      constant.excelSheetName.RESOURCE_MIX
    );
    worksheet.properties.defaultColWidth = 20;

    let rowData = await estimationResourceCountService.getResourceCount(
      newPayload
    );

    console.log("rowData", rowData);

    let colData = [
      { name: "S No.", key: "s_no", width: 3 },
      { name: "Resource Count", key: "resourceCount", width: 15 },
      {
        name: "Skills(Effort & Summary Attributes)",
        key: "skill",
        width: 40,
      },
      { name: "Technologies", key: "techskills", width: 20 },
      { name: "Role", key: "role", width: 30 },
    ];

    const getRoleCountString = (arr) => {
      let newString = "";
      arr.forEach((el) => newString.concat(el.count, el.resourceRole));
      return newString;
    };

    let tableRowData = rowData.map((data, i) => {
      return [
        i + 1,
        data.resourceCount,
        data.attributeName,
        data.skills,
        // getRoleCountString(data.rolecount),
        "",
      ];
      //   s_no:
      //   resourceCount: data.resourceCount,
      //   skill: data.attributeName,
      //   techskills: data.skills,
      //   role: `${data.rolecount[0]} ${data.rolecount[1]}`,
      // };
    });

    console.log("tableRowData", tableRowData, "---", "colData", colData);

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
  //console.log("Resoure Planning data", resData);
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
      key: el.id === 1 ? "tag" : el.id,
      width: 20,
    };
  });
  estTagRowData = requirementData.tagSummaryData.map((el) => {
    let rowDataArr = [];
    estTagColumns.map((item) => {
      return rowDataArr.push(el[item.key]);
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

  // console.log(
  //   "estCalColumns",
  //   estCalColumns,
  //   "estCalRowData",
  //   requirementData.summaryCalData,
  //   estCalRowData
  // );

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

module.exports.checkEstName = async (reqPayload) => {
  let est = await estimationHeaderModal.findById(
    reqPayload.estimationHeaderId,
    "estName"
  );
  return est;
};

function deleteFile(name) {
  try {
    // delete file if already exists
    fs.unlinkSync(`./report/Estimation_${name}.xlsx`);
  } catch (err) {}
}
