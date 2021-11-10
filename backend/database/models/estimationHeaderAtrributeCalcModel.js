const { boolean, number, string, bool } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const estimationHeaderAtrributeCalcSchema = new mongoose.Schema({
    estHeaderId: {
        type: Schema.Types.ObjectId,
        ref: 'EstHeader'
    },
    calcAttribute: String,
    calcAttributeName: String,
    isFormula: Boolean,
    formula: String,
    operator: String,
    unit: Number,
    description: String,
    value: String

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
module.exports = mongoose.model("estimationHeaderAtrributeCalc", estimationHeaderAtrributeCalcSchema)