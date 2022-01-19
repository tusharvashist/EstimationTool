const exporess = require("express");
const locationController = require("../controller/locationController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiRequirementTagSchema = require("../apiSchma/joiRequirementTagSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");

router.get(
  "/estimation",
  tokenValidation.validateToken,
  locationController.getAllEstmationHeaderLocation
);

router.get(
  "/",
  tokenValidation.validateToken,
  locationController.getAllLocations
);

module.exports = router;
