const { number } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const estimationAttributeSchema = new mongoose.Schema({
    attributeCode: {
        type: String,        
        required: 'Attribute Code is required!'
    }, attributeName: {
        type: String,
        required: 'Attribute Name is required!'
    },
    description: {
        type: String
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
estimationAttributeSchema.index({ updatedAt: '-1'});
module.exports = mongoose.model("EstimationAttributes", estimationAttributeSchema)