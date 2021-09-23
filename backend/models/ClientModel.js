const mongoose = require('mongoose');

var schema = mongoose.Schema(
    {
        name: { type: String },
        description: { type: String },
        website: { type: String },
        active_status: { type: Boolean },
    },
    { timestamps: true }
);

const ClientModel = mongoose.model('Clients', schema);

module.exports = ClientModel;
