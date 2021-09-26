const mongoose = require("mongoose");
const estimationShema = new mongoose.Schema({
    estimationName:String,
    estimationDescription:String,
    estimationType:String,
    clientName:String,
    projectName:String,
    lastupdate:Date
},{
    timestamps:true,
    toObject:{
        transform: function(doc,ret,option){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})
module.exports = mongoose.model("estimation", estimationShema)