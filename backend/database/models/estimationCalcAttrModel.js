const { boolean, number, string, bool } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const estimationCalcAttrSchema = new mongoose.Schema({
    estTypeId: number,
    calcAttribute: string,
    calcAttributeName: string,
    isFormula: boolean,
    formula: string,
    operator: string,
    unit: number,
    description: string,

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
module.exports = mongoose.model("estimationCalcAttr", estimationCalcAttrSchema)