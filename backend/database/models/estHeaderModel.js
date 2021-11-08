const { number } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const estimationHeaderSchema = new mongoose.Schema({
    estheaderParentid: {
        type: String,
        required: 'Parent Id is required!'
    },
    estVersionno: {
        type: Number,
        required: 'Version No is required!'
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'ProjectMaster',
        required: true
    },
    estName: {
        type: String,
        required: 'Estimation Name is required!'
    },
    estTypeId: {
        type: Schema.Types.ObjectId,
        ref: 'EstimationTemplate'
    },
    estDescription: String,
    effortUnit: {
        type: String,
        required: 'Effort Unit is required!'
    },
    manCount: Number,
    contigency: String,
    totalCost: Number,
    estCalcColumns: String,
    estColumns: String,
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
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
module.exports = mongoose.model("EstHeader", estimationHeaderSchema)