const { boolean } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    projectName: String,
    projectDescription: String,
    domain: String,
    isDeleted: Boolean,
    client: {
      type: Schema.Types.ObjectId,
      ref: "ClientMaster",
      required: true,
    },
    estimates: [
      {
        type: Schema.Types.ObjectId,
        ref: "EstHeader",
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
projectSchema.index({ updatedAt: '-1'});
module.exports = mongoose.model("ProjectMaster", projectSchema)