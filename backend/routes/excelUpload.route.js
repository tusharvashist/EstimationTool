const express = require("express");
const router = express.Router();
const tokenValidation = require("../middleware/tokenValidationJwt");
const excelUploadController = require("../controller/excelUploadController");

//----- Create -----------
router.post("/:id",
    tokenValidation.validateToken,
    excelUploadController.uploadExcel
);

router.post("/validateSave/:id/:estHeaderId",
    tokenValidation.validateToken,
    excelUploadController.validateSave
);
//----- Create -----------
router.get("/getTemplate",
    tokenValidation.validateToken,
    excelUploadController.getTemplate
);

//----- Create -----------
router.put("/:id",
    tokenValidation.validateToken,
    excelUploadController.updateRecord
);

module.exports = router;