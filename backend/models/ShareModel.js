const mongoose = require('mongoose');


var schema = mongoose.Schema(
    {
        SharedByUserId: { type: String },
        SharedToUserId: { type: String },
        EstimationId: { type: String },
        RoleId: { type: String },
        Version: { type: String },
        isActive: { type: Boolean },
    },
    { timestamps: true }
);


const ShareModel = mongoose.model('Share', schema);

module.exports = ShareModel;
