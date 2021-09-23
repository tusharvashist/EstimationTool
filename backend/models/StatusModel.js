const mongoose = require('mongoose');


var schema = mongoose.Schema(
    {
        StatusId: { type: String },
        Name: { type: String },
        Version: { type: String },
        isActive: { type: Boolean },
    },
    { timestamps: true }
);


const StatusModel = mongoose.model('Status', schema);

module.exports = StatusModel;
