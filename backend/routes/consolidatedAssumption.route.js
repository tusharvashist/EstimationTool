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

module.exports = router;
