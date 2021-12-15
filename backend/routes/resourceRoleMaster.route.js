const exporess = require("express");
const resourceRoleMasterController = require("../controller/resourceRoleMasterController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiResourceRoleMaster = require("../apiSchma/joiResourceRoleMasterSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");

router.get(
  "/",
  tokenValidation.validateToken,
  // joiSchemaValidation.validateQueryParams(
  //   joiResourceRoleMaster.getResourceRoleMasterSchema
  // ),
  resourceRoleMasterController.getAllResourceRoleMaster
);
router.post(
  "/",
  tokenValidation.validateToken,
  joiSchemaValidation.validateBody(
    joiResourceRoleMaster.createResourceRoleMasterSchema
  ),
  resourceRoleMasterController.createResourceRoleMaster
);

router.post(
  "/estResourcePlanning/",
  tokenValidation.validateToken,
  joiSchemaValidation.validateBody(
    joiResourceRoleMaster.createResourceRoleMasterSchema
  ),
  resourceRoleMasterController.createResourceRoleMaster
);
module.exports = router;
