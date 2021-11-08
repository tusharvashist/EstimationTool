const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const estHeaderRequirement = new mongoose.Schema({
    requirement: {
        type: Schema.Types.ObjectId,
        ref: 'ProjectRequirement'
    },
    estHeader: {
        type: Schema.Types.ObjectId,
        ref: 'EstHeader'
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
module.exports = mongoose.model("ESTHeaderRequirement", estHeaderRequirement)