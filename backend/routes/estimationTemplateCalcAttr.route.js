const exporess = require("express");
const estimationTemplateCalcAttrController = require("../controller/estimationTemplateCalcAttrController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiEstimationTemplateCalcAttrSchema = require("../apiSchma/joiEstimationTemplateCalcAttr");
const tokenValidation = require("../middleware/tokenValidationJwt");

//----- Create EstimationTemplateCalcAttr-----------
router.post("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiEstimationTemplateCalcAttrSchema.createEstimationTemplateCalcAttrSchema),
    estimationTemplateCalcAttrController.createEstimationTemplateCalcAttr
);

//----- Get EstimationTemplateCalcAttr By ID -----------
router.get("/:id",
    tokenValidation.validateToken,
    estimationTemplateCalcAttrController.getEstimationTemplateCalcAttrById);

//----- Update EstimationTemplateCalcAttr -----------
router.put("/:id",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiEstimationTemplateCalcAttrSchema.createEstimationTemplateCalcAttrSchema),
    estimationTemplateCalcAttrController.estimationTemplateCalcAttrUpdate);


//----- Get All EstimationTemplateCalcAttr List -----------
router.get("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(joiEstimationTemplateCalcAttrSchema.getallEstimationTemplateCalcAttr),
    estimationTemplateCalcAttrController.getAllEstimationTemplateCalcAttr
);


//----- Delete EstimationTemplateCalcAttr -----------
router.delete("/:id",
    tokenValidation.validateToken,
    estimationTemplateCalcAttrController.estimationTemplateCalcAttrDelete
);

module.exports = router;