const mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        FeatureId: { type: String },
        AtrributeId: { type: String },
        AttributsInFeatures: { type: String },
        EffertHours: { type: String },
        isActive: { type: Boolean },
    },
    { timestamps: true }
);

const AttributsInFeaturesModel = mongoose.model('AttributsInFeatures', schema);

module.exports = AttributsInFeaturesModel;