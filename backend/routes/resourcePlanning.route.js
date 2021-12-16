const exporess = require("express");
const resourceCountController = require("../controller/estimationResourceCountController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiClientSchema = require("../apiSchma/jioClientSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");
const resourceMixController = require("../controller/resourcemixController");

//----- Create -----------
// router.post(
//   "/",
//   tokenValidation.validateToken,
//   joiSchemaValidation.validateBody(joiClientSchema.createClientSchema),
//   clientController.createClient
// );

//----- Generate Resource Count -----------
router.get(
  "/",
  tokenValidation.validateToken,
  resourceCountController.generateResourceCount
);

router.get(
  "/all",
  tokenValidation.validateToken,
  resourceCountController.getResourceCount
);

//----- Update Technology-----------
router.put(
  "/updatetechnology",
  tokenValidation.validateToken,
  resourceCountController.updateTechnologyResourceCount
);

//-------Update Resource Role Allocation
router.put(
  "/updateresourcerole",
  tokenValidation.validateToken,
  resourceCountController.updateResourcePlanning
);

//----- get Resource mix -----------
router.get(
  "/mix/:id",
  tokenValidation.validateToken,
  resourceMixController.getResourceMix
);

//----- Get all List -----------
// router.get(
//   "/",
//   tokenValidation.validateToken,
//   joiSchemaValidation.validateQueryParams(joiClientSchema.getallClients),
//   clientController.getAllClient
// );

//----- Delete -----------
// router.delete(
//   "/:id",
//   tokenValidation.validateToken,
//   clientController.clientDelete
// );
module.exports = router;
