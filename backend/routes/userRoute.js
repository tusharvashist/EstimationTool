

const exporess = require("express");
const router =  exporess.Router();
const userController = require("../controller/userController");
const joiSchemaValidation =  require("../middleware/joiSchemaValidation");
const joiUserSchema =  require("../apiSchma/joiUserSchema");

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
module.exports = router;