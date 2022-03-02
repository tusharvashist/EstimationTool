const exporess = require("express");
const router = exporess.Router();
const consolidatedAssumptionController = require("../controller/consolidatedAssumptionController");
//const joiSchemaValidation =  require("../middleware/joiSchemaValidation");
//const joiUserSchema = require("../apiSchma/joiUserSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");

router.post(
  "/",
  tokenValidation.validateToken,
  consolidatedAssumptionController.createConsolidatedAssumption
);

router.get(
  "/",
  tokenValidation.validateToken,
  consolidatedAssumptionController.getConsolidatedAssumption
);

router.get(
  "/tags",
  tokenValidation.validateToken,
  consolidatedAssumptionController.getTag
);

router.put(
  "/",
  tokenValidation.validateToken,
  consolidatedAssumptionController.updateAssumption
);

router.put(
  "/mapWithEstimation/:id",
  tokenValidation.validateToken,
  consolidatedAssumptionController.linkAssumptionWithEstimation
);

router.get(
  "/getLinkAssumptionWithEstimation/:id",
  tokenValidation.validateToken,
  consolidatedAssumptionController.getLinkAssumptionWithEstimation
);

router.delete(
  "/",
  tokenValidation.validateToken,
  consolidatedAssumptionController.deleteAssumption
);

module.exports = router;
