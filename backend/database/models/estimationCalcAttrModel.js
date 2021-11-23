const { boolean, number, string, bool } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const estimationCalcAttrSchema = new mongoose.Schema({
    estTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'EstimationTemplate'
    },
    calcAttribute: String,
    calcAttributeName: String,
    isFormula: Boolean,
    formula: String,
    operator: String,
    unit: Number,
    description: String,
    calcType: String,
    tags: [{
        type: Schema.Types.Array,
        ref: 'requirementTag'
    }]


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
estimationCalcAttrSchema.index({ updatedAt: '-1' });
module.exports = mongoose.model("estimationCalcAttr", estimationCalcAttrSchema)