const estimationRequirementService = require("./estimationRequirementService");
const resourceCountMixService = require("./resourceMixService");

const ExcelJS = require("exceljs");
const constant = require("../constant/index");

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
      ref: "A20",
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
