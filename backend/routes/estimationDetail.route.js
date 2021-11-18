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
router.get("/get/data/:id",
    tokenValidation.validateToken,
    //joiSchemaValidation.validateBody(joiEstimationHeaderAtrributeSchema.createEstimationHeaderAtrributeSchema),
    estimationDetail.getRequirementData
);
//----- Delete est header attr-----------
router.delete("/:id",
    tokenValidation.validateToken,
   estimationDetail.requirementDelete
);

module.exports = router;



