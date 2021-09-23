const mongoose = require('mongoose');

const Project = mongoose.model('Project', {
    name : {type: String},
    description: {type: String},
    active_status : {type: Boolean},
    client_id : {type: String}
});

module.exports = Project;
