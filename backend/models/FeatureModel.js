const mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        estimation: { type: String },
        title: { type: String },
        description: { type: String },
        verson: { type: Int },
        type: { type: String },
        isActive: { type: Boolean },
    },
    { timestamps: true }
);

const FeatureModel = mongoose.model('Feature', schema);

module.exports = FeatureModel;
