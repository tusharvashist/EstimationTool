const mongoose = require('mongoose');


var schema = mongoose.Schema(
    {
        name: { type: String },
        client_id: { type: String },
        description: { type: String },
        active_status: { type: Boolean },
    },
    { timestamps: true }
);

const ProjectModel = mongoose.model('Project', schema);

module.exports = ProjectModel;
