const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const techSkillMaster = new mongoose.Schema(
  {
    skill: String,
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
techSkillMaster.index({ updatedAt: "-1", skill: "1" });
module.exports = mongoose.model("TechSkillMaster", techSkillMaster);
