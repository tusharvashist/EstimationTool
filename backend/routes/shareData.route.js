const exporess = require("express");
const shareDataController = require("../controller/shareDataController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiModuleTokenSchema = require("../apiSchma/joiModuleTokenSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");

//----- Create Module-----------
router.post(
  "/",
  tokenValidation.validateToken,
  shareDataController.createShareData
);


module.exports = router;
