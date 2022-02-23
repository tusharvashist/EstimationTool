const exporess = require("express");
const roleController = require("../controller/roleMasterController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiRoleSchema = require("../apiSchma/joiRoleSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");

//----- Create Role-----------
router.post(
  "/",
  tokenValidation.validateToken,
  joiSchemaValidation.validateBody(joiRoleSchema.createRoleSchema),
  roleController.createRole
);

//----- Get Role By ID -----------
router.get(
  "/sharing",
  tokenValidation.validateToken,
  roleController.getAllSharingRole
);

router.get("/:id", tokenValidation.validateToken, roleController.getRoleById);

//----- Update Role -----------
router.put(
  "/:id",
  tokenValidation.validateToken,
  joiSchemaValidation.validateBody(joiRoleSchema.roleUpdateSchema),
  roleController.roleUpdate
);

//----- Get All Role List -----------
router.get(
  "/",
  tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(joiRoleSchema.getallRole),
  roleController.getAllRole
);

//----- Delete Role -----------
router.delete("/:id", tokenValidation.validateToken, roleController.roleDelete);

module.exports = router;
