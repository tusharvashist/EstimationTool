const express = require("express");
const router =  express.Router();
const joiSchemaValidation =  require("../middleware/joiSchemaValidation");
const joiEstimationClonePayload = require("../apiSchma/joiEstimationClonePayload");
const tokenValidation = require("../middleware/tokenValidationJwt");
const estimationController = require("../controller/estimationController");

//clone estimation
router.get("/cloneEstimation/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(joiEstimationClonePayload.getEstimationClonePayloadValidation),
    estimationController.cloningEstimation
);

module.exports = router;