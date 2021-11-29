const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const estResourcePlanning = new mongoose.Schema(
  {
    estResourceCountID: {
      type: Schema.Types.ObjectId,
      ref: "EstResourceCount",
    },
    resourceRoleID: {
      type: Schema.Types.ObjectId,
      ref: "resourceRoleMaster",
    },
    cost: Number,
    currency: String,
    price: Number,
    allocationPercent: Number,
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
