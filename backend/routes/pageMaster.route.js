const exporess = require("express");
const pageController = require("../controller/pageMasterController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiPageSchema = require("../apiSchma/joiPageMasterSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");

//----- Create Role-----------
router.post("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiPageSchema.pageMasterCreateSchema),
    pageController.createPageMaster
);

//----- Get All Role List -----------
router.get("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(joiPageSchema.getallPagemaster),
    pageController.getAllPagemaster
);

module.exports = router;