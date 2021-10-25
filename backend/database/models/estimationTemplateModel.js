const { number } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const estimationTemplateSchema = new mongoose.Schema({
    estType: String,
    description: String
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
module.exports = mongoose.model("EstimationTemplate", estimationTemplateSchema)