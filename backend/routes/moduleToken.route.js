const exporess = require("express");
const moduleTokenController = require("../controller/moduleTokenController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiModuleTokenSchema = require("../apiSchma/joiModuleTokenSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");

//----- Create Module-----------
router.post("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiModuleTokenSchema.moduleTokenCreateSchema),
    moduleTokenController.createModuleToken
);

//----- Get All Module List -----------
router.get("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(joiModuleTokenSchema.getallModuleToken),
    moduleTokenController.getAllModuleTokens
);

module.exports = router;