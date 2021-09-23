const mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        name: { type: String },
        isActive: { type: Boolean },
    },
    { timestamps: true }
);


const EffortAttribute = mongoose.model('EffortAttribute', schema);

module.exports = EffortAttribute;
