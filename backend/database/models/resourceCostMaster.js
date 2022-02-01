const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const resourceCostMaster = new mongoose.Schema(
  {
    resourceRoleId:  {
        type: Schema.Types.ObjectId,
        ref: "ResourceRoleMaster",
        required: true,
      },
    resourceRole: String,
    cost: Number,
    price: Number,
    location: String,
    appliedDate: Date
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

module.exports = mongoose.model("ResourceCostMaster", resourceCostMaster);
