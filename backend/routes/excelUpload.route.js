const express = require("express");
const router = express.Router();
const tokenValidation = require("../middleware/tokenValidationJwt");
const excelUploadController = require("../controller/excelUploadController");



//----- Create -----------
router.post("/:id",
    tokenValidation.validateToken,
    excelUploadController.uploadExcel
);


module.exports = router;