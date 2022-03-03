const exporess = require("express");
const estimationController = require("../controller/estimationController");
const estimationRequirementController = require("../controller/estimationRequirmentController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiEstimationSchema = require("../apiSchma/joiEstimationSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");
const joiEstimationHeaderAtrributeSchema = require("../apiSchma/joiEstimationHeaderAtrributeSchema");
const joiEstimationHeaderAtrributeCalcSchema = require("../apiSchma/joiEstimationHeaderAtrributeCalcSchema");
const joiEstimationClonePayload = require("../apiSchma/joiEstimationClonePayload");

//----- Create -----------
// router.post("/", 
// tokenValidation.validateToken,
// joiSchemaValidation.validateBody(joiEstimationSchema.createEstimationSchema),
// estimationController.createEstimation
// );


router.post("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiEstimationSchema.createEstimationHeaderSchema),
    estimationController.createEstimationHeader
);

//----- Get item by id -----------
// router.get("/:id",
// tokenValidation.validateToken,
// estimationController.getAllEstimationById);

//----- Update -----------
// router.put("/:id",
// tokenValidation.validateToken,
// joiSchemaValidation.validateBody(joiEstimationSchema.estimationUpdateSchema),
// estimationController.estimationUpdate);


//----- Get all List -----------
// router.get("/",
// tokenValidation.validateToken,
// joiSchemaValidation.validateQueryParams(joiEstimationSchema.getallEstimationSchema),
// estimationController.getAllEstimation
// );

router.get("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(joiEstimationSchema.getallEstimationSchema),
    estimationController.getRecentEstimation
);

router.get("/:id",
    tokenValidation.validateToken,
    estimationRequirementController.getById
);


//----- Delete Estimation -----------
router.delete("/:id",
    tokenValidation.validateToken,
    estimationController.estimationDelete
);

// ---- Update Estimation Header Basic info-----
router.put("/:id",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiEstimationSchema.UpdateEstimationHeaderSchema),
    estimationController.updateEstimationHeader
);


//=====================================estimationHeaderAtrribute=====================
//----- Create -----------
router.post("/atrribute/",
    tokenValidation.validateToken,
    //joiSchemaValidation.validateBody(joiEstimationHeaderAtrributeSchema.createEstimationHeaderAtrributeSchema),
    estimationController.createEstimationHeaderAtrribute
);

//----- Get wizard by id -----------
router.get("/atrribute/:id",
    tokenValidation.validateToken,
    estimationController.getEstimationHeaderAtrributeById);

//----- Update -----------
router.put("/atrribute/:id",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiEstimationHeaderAtrributeSchema.estimationHeaderAtrributeUpdateSchema),
    estimationController.estimationHeaderAtrributeUpdate);


//----- Get all est header attr List -----------
router.get("/atrribute/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(joiEstimationHeaderAtrributeSchema.getallEstimationHeaderAtrribute),
    estimationController.getAllEstimationHeaderAtrribute
);

//----- Delete est header attr-----------
router.delete("/atrribute/:id",
    tokenValidation.validateToken,
    estimationController.estimationHeaderAtrributeDelete
);

//==================================================================
//----- Create -----------
router.post("/atrributeCalc/",
    tokenValidation.validateToken,
    //joiSchemaValidation.validateBody(joiEstimationHeaderAtrributeCalcSchema.estimationHeaderAtrributeCalcUpdateSchema),
    estimationController.createEstimationHeaderAtrributeCalc
);

//----- Get wizard by id -----------
router.get("/atrributeCalc/:id",
    tokenValidation.validateToken,
    estimationController.getEstimationHeaderAtrributeCalcById);

//----- Update -----------
router.put("/atrributeCalc/:id",
    tokenValidation.validateToken,
    // joiSchemaValidation.validateBody(joiEstimationHeaderAtrributeCalcSchema.estimationHeaderAtrributeCalcUpdateSchema),
    estimationController.estimationHeaderAtrributeCalcUpdate);


//----- Get all List -----------
router.get("/atrributeCalc/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(joiEstimationHeaderAtrributeCalcSchema.getallEstimationHeaderAtrributeCalc),
    estimationController.getAllEstimationHeaderAtrributeCalc
);

//----- Delete -----------
router.delete("/atrributeCalc/:id",
    tokenValidation.validateToken,
    estimationController.estimationHeaderAtrributeCalcDelete
);


// ------------------Release Estimation

router.post("/releaseEstimation/",
    // tokenValidation.validateToken,
    estimationController.releaseEstimation
);

router.get("/versioningEstimation/:id",
    tokenValidation.validateToken,
    estimationController.versioningEstimation
);

module.exports = router;





//====================================================================
