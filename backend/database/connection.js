const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const url = process.env.DB_URL || 'mongodb://localhost:27017/estimationtool';
    let localMsz = ()=>{ console.log("Your MongoDB Database connected to local successfully ..! (:")}
    let prodctionMsz = ()=>{console.log("Your MongoDB Database connected to Prodction successfully ..(:")}

    if(process.env.NODE_ENV === 'production'){
      return await mongoose.connect(url, {useNewUrlParser: true }).then(()=>{
        prodctionMsz()
      }).catch((err)=>{
        console.log("Error: MoboDB Database Not connected :( ", err);
      });
    }

    return await mongoose.connect(url, {useNewUrlParser: true }).then(()=>{
      localMsz()
      }).catch((err)=>{
        console.log("Error: MoboDB Database Not connected :( ", err);
      });

  }catch (err) {
    console.log("MoboDB Database Not connected :( ", err);
    throw new Error(err);
  }
};
