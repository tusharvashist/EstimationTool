const mongoose = require("mongoose");
const roleModelSchema = new mongoose.Schema({
    roleName: String,
    roleDescription: String,

},
    // {
    //     timestamps:true,
    //     toObject:{
    //         transform: function(doc,ret,option){
    //             ret.id = ret._id;
    //             delete ret._id;
    //             delete ret.__v;
    //             return ret;
    //         }
    //     }
    // }
)
module.exports = mongoose.model("roleModel", roleModelSchema)