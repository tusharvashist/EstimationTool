const exporess = require("express");
const estimationTemplateController = require("../controller/estimationTemplateController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiEstimationTemplateSchema = require("../apiSchma/joiEstimationTemplateSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");

//----- Create -----------
router.post("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiEstimationTemplateSchema.createEstimationTemplateSchema),
    estimationTemplateController.createEstimationTemplate
);

//----- Get Estimation Template by id -----------
// router.get("/:id",
//     tokenValidation.validateToken,
//     estimationTemplateController.getAllEstimationTemplate);

//----- Update -----------
// router.put("/:id",
//     tokenValidation.validateToken,
//     joiSchemaValidation.validateBody(joiEstimationTemplateSchema.estimationTemplateUpdateSchema),
//     estimationTemplateController.estimationTemplateUpdate);


//----- Get all List -----------
router.get("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(joiEstimationTemplateSchema.getallEstimationTemplate),
    estimationTemplateController.getAllEstimationTemplate
);

//----- Delete -----------
// router.delete("/:id",
// tokenValidation.validateToken,
// clientController.clientDelete
// );
module.exports = router;
