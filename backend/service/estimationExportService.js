const estimationRequirementService = require("./estimationRequirementService");

module.exports.requiredData = async (conditions) => {
  if (
    conditions.reports.some(
      (el) => el.key === "estimationDetail" && el.value === true
    )
  ) {
    const payload = { id: conditions.estimationHeaderId };
    const requirementData =
      await estimationRequirementService.getRequirementData(payload);
    console.log("requirementData");
  }
};
