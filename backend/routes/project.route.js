const exporess = require("express");
const projectController = require("../controller/projectController");
const router =  exporess.Router();
const joiSchemaValidation =  require("../middleware/joiSchemaValidation");
const joiProjectSchema =  require("../apiSchma/jioProjectSchema");
const tokenValidation =  require("../middleware/tokenValidationJwt");

//----- Create Project-----------
router.post("/", 
    tokenValidation.validateToken,
    joiSchemaValidation.validateBody(joiProjectSchema.createProjectSchema),
    projectController.createProject
);

//----- Get Project By ID -----------
router.get("/:id",
tokenValidation.validateToken,
projectController.getProjectById);

//----- Update Project -----------
router.put("/:id",
tokenValidation.validateToken,
joiSchemaValidation.validateBody(joiProjectSchema.projectUpdateSchema),
projectController.projectUpdate);


//----- Get All Project List -----------
router.get("/",
tokenValidation.validateToken,
joiSchemaValidation.validateQueryParams(joiProjectSchema.getallProject),
projectController.getAllProject
);

//----- Delete Project -----------
router.delete("/:id",
tokenValidation.validateToken,
projectController.projectDelete
);

module.exports = router;