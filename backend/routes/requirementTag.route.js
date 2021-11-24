const exporess = require("express");
const requirementTagController = require("../controller/requirementTagController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiRequirementTagSchema = require("../apiSchma/joiRequirementTagSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");


router.get("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(joiRequirementTagSchema.getallRequirementTag),
    requirementTagController.getAllRequirementTag
);
module.exports = router;