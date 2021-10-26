const exporess = require("express");
const moduleController = require("../controller/moduleMasterController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiModuleMasterSchema = require("../apiSchma/joiModuleMasterSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");

//----- Create Module-----------
router.post("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiModuleMasterSchema.moduleMasterCreateSchema),
    moduleController.createModuleMaster
);

//----- Get All Module List -----------
router.get("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(joiModuleMasterSchema.getallModuleMaster),
    moduleController.getAllModulemaster
);

module.exports = router;