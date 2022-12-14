const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const shareDataModel = new mongoose.Schema(
  {
    typeId: { type: Schema.Types.ObjectId, ref: "EstHeader" },
    typeName: String,
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "RoleMaster",
    },
    ownerUserId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    shareUserId: {
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

module.exports = mongoose.model("ShareDataModel", shareDataModel);
