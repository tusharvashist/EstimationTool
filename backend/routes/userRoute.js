

const exporess = require("express");
const router = exporess.Router();
const userController = require("../controller/userController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiUserSchema = require("../apiSchma/joiUserSchema");

//-----  signup/ create user -----------
router.post("/signup",
  joiSchemaValidation.validateBody(joiUserSchema.signup),
  userController.signup
);

//----- Create -----------
router.post("/login",
  joiSchemaValidation.validateHeadresAuthorization(),
  userController.login
);

router.get(
  "/getusers",
  joiSchemaValidation.validateHeadresAuthorization(),
  userController.getAllUserByName
);

router.get("/validateshareestlink/:estheaderId",
  userController.validateshareestlink
);

//----- Update User Role  -----------
router.put("/updateuserrole/:id",
  joiSchemaValidation.validateHeadresAuthorization(),
  userController.updateuserrole
);
module.exports = router;