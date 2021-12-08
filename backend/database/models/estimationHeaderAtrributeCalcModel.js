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
    formula: String, // percentage/ manual
    operator: String, // %
    unit: Number,// value e.g:20%
    description: String, // comment
    value: Number,// It will hold formula calculated  or manual value
    calcType: String,


    tag: {
        type: Schema.Types.ObjectId,
        ref: 'requirementTag'
    }, // architechture, Unit testing..are the examples
    formulaTags: [{
        type: Schema.Types.ObjectId,
        ref: 'requirementTag'
    }] // DEV+ARch+Manual+Unit testing+.....

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
estimationHeaderAtrributeCalcSchema.index({ updatedAt: '-1' });
module.exports = mongoose.model("estimationHeaderAtrributeCalc", estimationHeaderAtrributeCalcSchema)