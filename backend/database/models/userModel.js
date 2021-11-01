const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName:String,
    email:String,
    pass:String,
},{
    timestamps:true,
    toObject:{
        transform: function(doc,ret,option){
            ret.id = ret._id;
            delete ret._id;
            delete ret.pass;
            delete ret.__v;
            return ret;
        }
    }
})
module.exports = mongoose.model("user", userSchema)