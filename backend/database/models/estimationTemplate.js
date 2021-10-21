const { number } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const estimationTemplateSchema = new mongoose.Schema({
estType:{ 
    type: String, 
    required: 'Estimation Type is required!'
},
description:{ 
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
module.exports = mongoose.model("EstimationTemplate", estimationTemplateSchema)