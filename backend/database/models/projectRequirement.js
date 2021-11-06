const { boolean } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const projectRequirementSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: {
        type: Schema.Types.ObjectId,
        ref: 'requirementType',
        required: true
    },
    tag: {
        type: Schema.Types.ObjectId,
        ref: 'requirementTag',
        required: true
    },
    mitigation: String,
    isDeleted: Boolean,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'ProjectMaster',
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
module.exports = mongoose.model("ProjectRequirement", projectRequirementSchema)