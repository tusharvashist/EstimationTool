const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const estRequirementDataSchema = new mongoose.Schema({
    ESTAttributeID: {
        type: Schema.Types.ObjectId,
        ref: 'EstimationAttributes',
    },
    ESTHeaderRequirementID: {
        type: Schema.Types.ObjectId,
        ref: 'ESTHeaderRequirement',
    },
    ESTHeaderID: {
        type: Schema.Types.ObjectId,
        ref: 'ESTHeaderRequirement',
    },
    ESTData: Number,
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
estRequirementDataSchema.index({ updatedAt: '-1'});
module.exports = mongoose.model("estRequirementData", estRequirementDataSchema)