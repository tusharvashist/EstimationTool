const mongoose = require('mongoose');


var schema = mongoose.Schema(
    {
        UserId: { type: String },
        EstimationId: { type: String },
        RoleId: { type: String },
        isActive: { type: Boolean },
    },
    { timestamps: true }
);



const UserRoleInEstimationModel = mongoose.model('UserRoleInEstimation', schema);

module.exports = UserRoleInEstimationModel;
