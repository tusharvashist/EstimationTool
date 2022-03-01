const mongoose = require("mongoose");

const roleModelSchema = new mongoose.Schema({
  roleName: String,
  roleDescription: String,
  seq: { type: Number, default: 0 },
});
module.exports = mongoose.model("RoleMaster", roleModelSchema);
