const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/EstimationToolDB",
 {useNewUrlParser: true, useUnifiedTopology: true},
 (err) => {
     if(!err){
        console.log('Database connection successfull, Estimation tool project');
     }else{
         console.log('Error in database connection' + err);
     }

 } )

module.exports = mongoose;

