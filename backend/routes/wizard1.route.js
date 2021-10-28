const exporess = require("express");
const wizard1Controller = require("../controller/wizard1Controller");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiWizard1Schema = require("../apiSchma/joiWizard1Schema");
const tokenValidation = require("../middleware/tokenValidationJwt");

//----- Create -----------
router.post("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiWizard1Schema.createWizard1Schema),
    wizard1Controller.createWizard1
);

//----- Get wizard by id -----------
router.get("/:id",
    tokenValidation.validateToken,
    wizard1Controller.getWizard1ById);

//----- Update -----------
router.put("/:id",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiWizard1Schema.wizard1UpdateSchema),
    wizard1Controller.wizard1Update);


//----- Get all List -----------
router.get("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(joiWizard1Schema.getallWizard1),
    wizard1Controller.getAllWizard1
);

//----- Delete -----------
router.delete("/:id",
    tokenValidation.validateToken,
    wizard1Controller.wizard1Delete
);
module.exports = router;