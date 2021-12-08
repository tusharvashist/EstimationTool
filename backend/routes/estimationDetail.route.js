const exporess = require("express");
const estimationDetail = require("../controller/estimationRequirmentController");
const router = exporess.Router();
const tokenValidation = require("../middleware/tokenValidationJwt");

//----- Create -----------
router.post("/",
    tokenValidation.validateToken,
    //joiSchemaValidation.validateBody(joiEstimationHeaderAtrributeSchema.createEstimationHeaderAtrributeSchema),
    estimationDetail.create
);

router.put("/:id",
    tokenValidation.validateToken,
    //joiSchemaValidation.validateBody(joiEstimationHeaderAtrributeSchema.createEstimationHeaderAtrributeSchema),
    estimationDetail.update
);

router.put("/data/update",
    tokenValidation.validateToken,
    //joiSchemaValidation.validateBody(joiEstimationHeaderAtrributeSchema.createEstimationHeaderAtrributeSchema),
    estimationDetail.updateRequirementData
);
router.put("/map/Header/ToMultipleRequirement/:id",
    tokenValidation.validateToken,
    //joiSchemaValidation.validateBody(joiEstimationHeaderAtrributeSchema.createEstimationHeaderAtrributeSchema),
    estimationDetail.mapHeaderToMultipleRequirement
);
router.put("/update/ManualCallAttribute/:id",
    tokenValidation.validateToken,
    //joiSchemaValidation.validateBody(joiEstimationHeaderAtrributeSchema.createEstimationHeaderAtrributeSchema),
    estimationDetail.updateManualCallAttribute
);

//
router.get("/get/data/:id",
    tokenValidation.validateToken,
    //joiSchemaValidation.validateBody(joiEstimationHeaderAtrributeSchema.createEstimationHeaderAtrributeSchema),
    estimationDetail.getRequirementData
);


router.get("/get/Requirement/With/Query/:id",
    tokenValidation.validateToken,
    //joiSchemaValidation.validateBody(joiEstimationHeaderAtrributeSchema.createEstimationHeaderAtrributeSchema),
    estimationDetail.getRequirementWithQuery
);


router.get("/getUnpairedRequirementEstimation",
    tokenValidation.validateToken,
    //joiSchemaValidation.validateBody(joiEstimationHeaderAtrributeSchema.createEstimationHeaderAtrributeSchema),
    estimationDetail.getUnpairedRequirementEstimation
);


//----- Delete est header attr-----------
router.delete("/:id",
    tokenValidation.validateToken,
   estimationDetail.requirementDelete
);

module.exports = router;



