const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const requirementTypeSchema = new mongoose.Schema({
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
module.exports = mongoose.model("requirementType", requirementTypeSchema)