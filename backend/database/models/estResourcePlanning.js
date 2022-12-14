const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const estResourcePlanning = new mongoose.Schema(
  {
    estResourceCountID: {
      type: Schema.Types.ObjectId,
      ref: "EstResourceCount",
    },
    estHeaderId: {
      type: Schema.Types.ObjectId,
      ref: "EstHeader",
    },
    resourceRoleID: {
      type: Schema.Types.ObjectId,
      ref: "ResourceRoleMaster",
    },
    estAttributeId: {
      type: Schema.Types.ObjectId,
      ref: "EstimationAttributes",
    },
    estCalcId: {
      type: Schema.Types.ObjectId,
      ref: "estimationCalcAttr",
    },
    cost: Number,
    currency: String,
    price: Number,
    allocationPercent: Number,
    defaultAdjusted: Boolean,
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

module.exports = mongoose.model("EstResourcePlanning", estResourcePlanning);
