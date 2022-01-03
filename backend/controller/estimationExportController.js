const constant = require("../constant");
const estimationExportService = require("../service/estimationExportService");

//@type     GET
//@desc     To get all the data for excel
module.exports.getAllData = async (req, res) => {
  let responce = { ...constant.defaultResponce };
  try {
    const responceExportSer = await estimationExportService.requiredData(
      req.body
    );
    responce = responceExportSer;
    return res.status(200).json(responce);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
