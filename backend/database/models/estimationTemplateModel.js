const { number } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const estimationTemplateSchema = new mongoose.Schema(
  {
    estType: String,
    description: String,
    contingency: Number,
    reqTypeValidation: [
      {
        type: Schema.Types.ObjectId,
        ref: "requirementType",
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, option) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);
estimationTemplateSchema.index({ updatedAt: "-1" });
module.exports = mongoose.model("EstimationTemplate", estimationTemplateSchema);
