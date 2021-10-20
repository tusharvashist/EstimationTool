const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const estimationShema = new mongoose.Schema({
    estimationName: String,
    estimationDescription: String,
    estimationType: String,
    project: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    },
    lastupdate: Date
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
module.exports = mongoose.model("estimation", estimationShema)