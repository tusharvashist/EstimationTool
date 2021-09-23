const mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        EstimationId: { type: String },
        AtrributeId: { type: String },
        AttributsInEstimationId: { type: String },
        isActive: { type: Boolean },
    },
    { timestamps: true }
);

const AttributsInEstimationModel = mongoose.model('AttributsInEstimation', schema);

module.exports = AttributsInEstimationModel;