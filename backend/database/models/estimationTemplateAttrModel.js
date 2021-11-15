const { number } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const estimationTemplateAttrSchema = new mongoose.Schema({
    estAttrId: {
        type: Schema.Types.ObjectId,
        ref: "EstimationAttributes",
        required: 'Attribute Id  is required!'
    },
    estTypeId: {
        type: Schema.Types.ObjectId,
        ref: "EstimationTemplate",
        required: 'Estimation Type is required!'
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
estimationTemplateAttrSchema.index({ updatedAt: '-1'});
module.exports = mongoose.model("EstimationTemplateAttr", estimationTemplateAttrSchema)