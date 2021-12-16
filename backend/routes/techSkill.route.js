const exporess = require("express");
const techSkillController = require("../controller/techSkillMasterController");
const router = exporess.Router();
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const joiTechSkillSchema = require("../apiSchma/joiTechSkillMasterSchema");
const tokenValidation = require("../middleware/tokenValidationJwt");

//----- Create tech skill-----------
router.post("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiTechSkillSchema.createTechSkill),
    techSkillController.createTechSkillMaster
);
router.get("/",
    tokenValidation.validateToken,
    joiSchemaValidation.validateQueryParams(joiTechSkillSchema.getallTechSkill),
    techSkillController.getAllTechSkillMaster
); module.exports = router;