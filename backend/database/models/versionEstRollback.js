const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const VersionEstRollback = new mongoose.Schema(
  {
    estheaderParentid: Schema.Types.ObjectId,
    newEstHeaderId: Schema.Types.ObjectId,
    estHeaderRequirementIds: [
      {
        type: String,
      },
    ],
    estHeaderRequirementDatasIds: [
      {
        type: String,
      },
    ],
    estHeaderAttrCalcIds: [
      {
        type: String,
      },
    ],
    estHeaderAttrIds: [
      {
        type: String,
      },
    ],
    estResourceCountIds: [
      {
        type: String,
      },
    ],
    estResourcePlanningIds: [
      {
        type: String,
      },
    ],
  }
);
module.exports = mongoose.model("VersionEstRollback", VersionEstRollback);
