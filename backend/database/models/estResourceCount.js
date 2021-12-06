const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const estResourceCount = new mongoose.Schema(
  {
    estHeaderId: {
      type: Schema.Types.ObjectId,
      ref: "EstHeader",
    },
    resourceCount: Number,
    estAttributeId: {
      type: Schema.Types.ObjectId,
      ref: "EstimationAttributes",
    },
    estCalcId: {
      type: Schema.Types.ObjectId,
      ref: "estimationCalcAttr",
    },
    techSkill: {
      type: Schema.Types.ObjectId,
      ref: "TechSkillMaster",
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

module.exports = mongoose.model("EstResourceCount", estResourceCount);
