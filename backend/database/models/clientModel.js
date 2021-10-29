const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
    clientName:String,
    website:String,
    description:String
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
module.exports = mongoose.model("client", clientSchema)