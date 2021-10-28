const { boolean, string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const estimationTemplateCalcAttrSchema = new mongoose.Schema({
    estCalcId: String,
    estTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'EstimationTemplate'
    },

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
module.exports = mongoose.model("EstimationTemplateCalcAttr", estimationTemplateCalcAttrSchema)