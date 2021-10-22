const { number } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const pageMasterSchema = new mongoose.Schema({
    pageName: {
        type: String,
        required: true
    },
    pageURL: {
        type: String
    }
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
module.exports = mongoose.model("PageMaster", pageMasterSchema)