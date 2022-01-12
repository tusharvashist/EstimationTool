const exporess = require("express");
const router = exporess.Router();
const tokenValidation = require("../middleware/tokenValidationJwt");
const timelinePlanningController = require("../controller/timelinePlanningController");


//----- get timeline planning -----------
router.get(
  "/timelineplanning/:id",
  tokenValidation.validateToken,
  timelinePlanningController.getTimeLinePlanning
);
module.exports = router;
