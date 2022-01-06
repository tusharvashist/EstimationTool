const constant = require("../constant");
const estimationExportService = require("../service/estimationExportService");

//@type     GET
//@desc     To get all the data for excel
module.exports.getAllData = async (req, res) => {
  try {
    let isComplete = await estimationExportService.generateExcelReport(req.body);
    console.log(isComplete);
    res.status(200).send("Report Gentrated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports.getReport = async (req, res) => {
  res.download("./report/Estimation.xlsx", "Estimation.xlsx");
};
