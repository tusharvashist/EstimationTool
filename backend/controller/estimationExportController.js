const constant = require("../constant");
const estimationExportService = require("../service/estimationExportService");

//@type     GET
//@desc     To get all the data for excel
module.exports.getAllData = async (req, res) => {
  try {
    let isComplete = await estimationExportService.generateExcelReport(
      req.body
    );
    console.log(isComplete);
    res.status(200).send("Report Gentrated");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.getReport = async (req, res) => {
  try {
    let name = await estimationExportService.checkEstName(req.query);
    res.download(
      `./report/Estimation_${name.estName}.xlsx`,
      `Estimation_${name.estName}.xlsx`
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
};
