const mongoose = require('mongoose');


var schema = mongoose.Schema(
    {
        name: { type: String },
        isActive: { type: Boolean },
    },
    { timestamps: true }
);


const RoleModel = mongoose.model('Role', schema);

module.exports = RoleModel;
