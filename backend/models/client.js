const mongoose = require('mongoose');

const Client = mongoose.model('Clients',{
    name : {type: String},
    description : {type: String},
    website : {type : String},
    active_status : {type: Boolean}
});

module.exports = Client;