const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const resourceRoleMaster = new mongoose.Schema(
  {
    resourceRole: String,
    cost: Number,
    price: Number,
    techSkill: {
      type: Schema.Types.ObjectId,
      ref: "TechSkillMaster",
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "locationMaster",
    },
    isDeleted: Boolean,
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

module.exports = mongoose.model("ResourceRoleMaster", resourceRoleMaster);
