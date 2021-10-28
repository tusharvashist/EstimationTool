const exporess = require("express");
const permissionController = require("../controller/permissionController");
const router =  exporess.Router();
const joiSchemaValidation =  require("../middleware/joiSchemaValidation");
const joiPermissionSchema =  require("../apiSchma/joiPermissonSchema");
const tokenValidation =  require("../middleware/tokenValidationJwt");


router.post("/", 
tokenValidation.validateToken,
joiSchemaValidation.validateBody(joiPermissionSchema.createPermissionSchema),
permissionController.createPermission
);

//----- Update -----------
// router.put("/:id",
// tokenValidation.validateToken,
// joiSchemaValidation.validateBody(joiEstimationSchema.estimationUpdateSchema),
// estimationController.estimationUpdate);


//----- Get all List -----------
router.get("/",
tokenValidation.validateToken,
joiSchemaValidation.validateQueryParams(joiPermissionSchema.getAllPermission),
permissionController.getAllPermission
);

router.get("/user",
tokenValidation.validateToken,
joiSchemaValidation.validateQueryParams(joiPermissionSchema.getAllUserPermission),
permissionController.getAllUserPermission
);
module.exports = router;