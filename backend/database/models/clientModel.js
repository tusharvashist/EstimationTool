const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const clientSchema = new mongoose.Schema({
    clientName: String,
    website: String,
    description: String,
    isDeleted: Boolean,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'project'
    }]
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret, option) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})
module.exports = mongoose.model("client", clientSchema)