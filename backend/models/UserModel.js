const mongoose = require('mongoose');


var schema = mongoose.Schema(
    {
        name: { type: String },
        emailId: { type: String },
        isActive: { type: Boolean },
    },
    { timestamps: true }
);


const UserModel = mongoose.model('User', schema);

module.exports = RoleModel;
