const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    roleId:
    {
        type: Schema.Types.ObjectId,
        ref: 'RoleMaster'
    }
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret, option) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.pass;
            delete ret.__v;
            return ret;
        }
    }
})
userSchema.index({ updatedAt: '-1'});
module.exports = mongoose.model("user", userSchema)