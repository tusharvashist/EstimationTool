const exporess = require("express");
const estimationCalcAttrController = require("../controller/estimationCalcAttrController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiEstimationCalcAttrSchema = require("../apiSchma/joiEstimationCalcAttr");
const tokenValidation = require("../middleware/tokenValidationJwt");

//----- Create Project-----------
router.post("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiEstimationCalcAttrSchema.createEstimationCalcAttrSchema),
    estimationCalcAttrController.createEstimationCalcAttr
);

//----- Get Project By ID -----------
router.get("/:id",
    tokenValidation.validateToken,
    estimationCalcAttrController.getEstimationCalcAttrControllerById);

//----- Update Project -----------
router.put("/:id",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiEstimationCalcAttrSchema.createEstimationCalcAttrSchema),
    estimationCalcAttrController.estimationCalcAttrUpdate);


//----- Get All Project List -----------
router.get("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(joiEstimationCalcAttrSchema.getallEstimationCalcAttr),
    estimationCalcAttrController.getAllEstimationCalcAttr
);

//----- Delete Project -----------
router.delete("/:id",
    tokenValidation.validateToken,
    estimationCalcAttrController.estimationCalcAttrDelete
);

module.exports = router;