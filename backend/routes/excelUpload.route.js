const express = require("express");
const router = express.Router();
const tokenValidation = require("../middleware/tokenValidationJwt");
const excelUploadController = require("../controller/excelUploadController");



//----- Create -----------
router.post("/:id",
    tokenValidation.validateToken,
    excelUploadController.uploadExcel
);



//----- Create -----------
router.get("/getTemplate",
    tokenValidation.validateToken,
    excelUploadController.getTemplate
);

module.exports = router;