const { boolean } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const projectRequirementSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    req_id: Number,
    type: {
      type: Schema.Types.ObjectId,
      ref: "requirementType",
      required: false,
    },
    tag: {
      type: Schema.Types.ObjectId,
      ref: "requirementTag",
      required: false,
    },
    mitigation: String,
    isDeleted: Boolean,
    project: {
      type: Schema.Types.ObjectId,
      ref: "ProjectMaster",
      required: true,
    },
    queryAssumption: [
      {
        type: Schema.Types.ObjectId,
        ref: "QueryAssumption",
        required: true,
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
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
projectRequirementSchema.index({ updatedAt: "-1" });
module.exports = mongoose.model("ProjectRequirement", projectRequirementSchema);
