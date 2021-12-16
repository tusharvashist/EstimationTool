const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const resourceRoleMaster = new mongoose.Schema(
  {
    resourceRole: String,
    cost: Number,
    price: Number,
    techSkill: String,
    location: String,
    isDeleted: Boolean,
    defaultAdjusted: Boolean
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

module.exports = mongoose.model("ResourceRoleMaster", resourceRoleMaster);
