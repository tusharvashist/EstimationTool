const express = require("express");
const router = express.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const tokenValidation = require("../middleware/tokenValidationJwt");
const estimationExportController = require("../controller/estimationExportController");
const joiExportEstimationSchema = require("../apiSchma/joiExportEstimationSchema");

router.post(
  "/",
  tokenValidation.validateToken,
  joiSchemaValidation.validateBody(joiExportEstimationSchema.getAllExportData),
  estimationExportController.getAllData
);

module.exports = router;
