const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const reqCounter = new mongoose.Schema(
  {
    key:{
        type: String,
        default:"req_id" 
    },
    seq:{
        type: Number,
        default: 0
    }
}
);

module.exports = mongoose.model("reqCount", reqCounter);