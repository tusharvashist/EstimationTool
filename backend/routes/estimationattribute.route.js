const exporess = require("express");
const estimationAttController = require("../controller/estimationAttributeController");
const router =  exporess.Router();
const joiSchemaValidation =  require("../middleware/joiSchemaValidation");
const joiEstimationAttSchema =  require("../apiSchma/joiEstimationAttributeSchema");
const tokenValidation =  require("../middleware/tokenValidationJwt");


router.post("/", 
tokenValidation.validateToken,
joiSchemaValidation.validateBody(joiEstimationAttSchema.createEstimationAttributeSchema),
estimationAttController.createEstimationAttribute
);

//Create Estimation Selection Attribute
router.post("/estattribute", 
tokenValidation.validateToken,
joiSchemaValidation.validateBody(joiEstimationAttSchema.createEstimationTemplateAttSchema),
estimationAttController.createEstimationTempplateAttribute
);

//----- Update -----------
// router.put("/:id",
// tokenValidation.validateToken,
// joiSchemaValidation.validateBody(joiEstimationSchema.estimationUpdateSchema),
// estimationController.estimationUpdate);


//----- Get all List -----------
router.get("/",
tokenValidation.validateToken,
joiSchemaValidation.validateQueryParams(joiEstimationAttSchema.getAllEstimationAttribute),
estimationAttController.getAllEstimationAttributes
);


module.exports = router;