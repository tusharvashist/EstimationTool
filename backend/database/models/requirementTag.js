const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: String,
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret, option) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})
tagSchema.index({ updatedAt: '-1', name : '1'});
module.exports = mongoose.model("requirementTag", tagSchema)