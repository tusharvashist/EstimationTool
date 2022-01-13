const { number } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    typeId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    typeName: {
      type: String,
      required: "Type Name is required!",
    },
    tokenID: {
      type: Schema.Types.ObjectId,
      ref: "ModuleToken",
      required: true,
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
permissionSchema.index({ updatedAt: "-1" });
module.exports = mongoose.model("Permissions", permissionSchema);
