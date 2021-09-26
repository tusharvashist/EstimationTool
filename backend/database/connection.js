const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/estimationtool", {useNewUrlParser: true });
    console.log("database connected");
  } catch (err) {
    console.log("database connected", err);
    throw new Error(err);
  }
};
