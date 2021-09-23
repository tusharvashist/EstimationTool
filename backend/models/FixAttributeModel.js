const mongoose = require('mongoose');


var schema = mongoose.Schema(
    {
        name: { type: String },
        isActive: { type: Boolean },
    },
    { timestamps: true }
);

const FixAttributeModel = mongoose.model('FixAttribute', schema);

module.exports = FixAttributeModel;
