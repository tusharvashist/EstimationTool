const exporess = require("express");
const estimationController = require("../controller/estimationController");
const router =  exporess.Router();
const joiSchemaValidation =  require("../middleware/joiSchemaValidation");
const joiEstimationSchema =  require("../apiSchma/joiEstimationSchema");
const tokenValidation =  require("../middleware/tokenValidationJwt");
//----- Create -----------
router.post("/", 
tokenValidation.validateToken,
joiSchemaValidation.validateBody(joiEstimationSchema.createEstimationSchema),
estimationController.createEstimation
);

//----- Get item by id -----------
router.get("/:id",
tokenValidation.validateToken,
estimationController.getAllEstimationById);

//----- Update -----------
router.put("/:id",
tokenValidation.validateToken,
joiSchemaValidation.validateBody(joiEstimationSchema.estimationUpdateSchema),
estimationController.estimationUpdate);


//----- Get all List -----------
router.get("/",
tokenValidation.validateToken,
joiSchemaValidation.validateQueryParams(joiEstimationSchema.getallEstimationSchema),
estimationController.getAllEstimation
);

//----- Get all List -----------
router.delete("/:id",
tokenValidation.validateToken,
estimationController.estimationDelete
);
module.exports = router;