const { boolean } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const queryAssumptionSchema = new mongoose.Schema({
    query: String,
    assumption: String,
    reply: String,
    projectRequirement: {
        type: Schema.Types.ObjectId,
        ref: 'ProjectRequirement',
        required: true
    }
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

module.exports = mongoose.model("QueryAssumption", queryAssumptionSchema)