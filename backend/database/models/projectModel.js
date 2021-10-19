const { boolean } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: String,
    projectDescription: String,
    domain: String,
    isDeleted: Boolean,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'client',
        required: true
    },
    estimates: [{
        type: Schema.Types.ObjectId,
        ref: 'estimation'
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
module.exports = mongoose.model("project", projectSchema)