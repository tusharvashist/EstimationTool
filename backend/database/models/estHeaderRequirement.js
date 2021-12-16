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
    },
    // estRequirementData: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'estRequirementData'
    // }],
    isDeleted: Boolean,
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
estHeaderRequirement.index({ updatedAt: '-1'});
module.exports = mongoose.model("ESTHeaderRequirement", estHeaderRequirement)