const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    projectName:String,
    projectDescription:String
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
module.exports = mongoose.model("project", projectSchema)