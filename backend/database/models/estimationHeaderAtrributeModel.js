const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const estimationHeaderAtrributeSchema = new mongoose.Schema({
    estHeaderId: {
        type: Schema.Types.ObjectId,
        ref: 'EstHeader'
    },
    estAttributeId: {
        type: Schema.Types.ObjectId,
        ref: 'EstimationAttributes'
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
module.exports = mongoose.model("estimationHeaderAtrribute", estimationHeaderAtrributeSchema)

