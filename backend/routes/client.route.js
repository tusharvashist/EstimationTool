const exporess = require("express");
const clientController = require("../controller/clientController");
const router =  exporess.Router();
const joiSchemaValidation =  require("../middleware/joiSchemaValidation");
const joiClientSchema =  require("../apiSchma/jioClientSchema");
const tokenValidation =  require("../middleware/tokenValidationJwt");

//----- Create -----------
router.post("/", 
tokenValidation.validateToken,
joiSchemaValidation.validateBody(joiClientSchema.createClientSchema),
clientController.createClient
);

//----- Get item by id -----------
router.get("/:id",
tokenValidation.validateToken,
clientController.getClientById);

//----- Update -----------
router.put("/:id",
tokenValidation.validateToken,
joiSchemaValidation.validateBody(joiClientSchema.clientUpdateSchema),
clientController.clientUpdate);


//----- Get all List -----------
router.get("/",
tokenValidation.validateToken,
joiSchemaValidation.validateQueryParams(joiClientSchema.getallClients),
clientController.getAllClient
);

//----- Delete -----------
router.delete("/:id",
tokenValidation.validateToken,
clientController.clientDelete
);
module.exports = router;