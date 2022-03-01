const express = require("express");
const emailController = require("../controller/emailController");
const router =  express.Router();
const joiSchemaValidation =  require("../middleware/joiSchemaValidation");
const jioEmailSchema =  require("../apiSchma/jioEmailSchema");

//Send Mail
router.post("/",
joiSchemaValidation.validateQueryParams(jioEmailSchema.sendMail),
emailController.sendMail
);

module.exports = router;