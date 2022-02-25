const exporess = require("express");
const shareDataController = require("../controller/shareDataController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiModuleTokenSchema = require("../apiSchma/joiModuleTokenSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");

//----- Create Sharing-----------
router.post(
  "/",
  tokenValidation.validateToken,
  shareDataController.createShareData
);

router.get(
  "/",
  tokenValidation.validateToken,
  shareDataController.GetSharingData
);

module.exports = router;
