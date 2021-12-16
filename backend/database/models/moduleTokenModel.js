const { number } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require('mongoose');

const moduleTokenSchema = new mongoose.Schema({
    moduleId: {
        type: Schema.Types.ObjectId,
        ref: "ModuleMaster",
        required: 'Module Id  is required!'
    },
    token: {
        type: String,        
        required: 'Token is required!'
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
moduleTokenSchema.index({ updatedAt: '-1'});
module.exports = mongoose.model("ModuleToken", moduleTokenSchema)