const Client = require('../models/ClientModel');
const APIResponse = require('../models/APIResponse');
const ObjectId = require('mongoose').Types.ObjectId;

// Retrieve all client from the database.
exports.findAllClient =  (req, res) => {
  
     Client.find()
      .then(data => {
        var response =  new APIResponse("200","Success",data);
        res.send(response);
      })
      .catch(err => {
        var response =  new APIResponse("500","Error",err);
        res.send(response);
      });
  };

  // Retrieve single client from the database.
exports.clientById =  (req, res) => {
  
    if(ObjectId.isValid(req.params.id)){
        Client.findById(req.params.id,(err,doc) => {
            if(err){
                console.log('Error in get data' + err);
            }else{
                res.send(doc);
            }
        });
    }else{
        return res.status(400).send('NO record found with id:' + req.params.id);
    }
 };

// Create new client
exports.createClient = (req, res) =>{
    let client = new Client(
        {
            name : req.body.name,
            description : req.body.description,
            website : req.body.website,
            active_status: req.body.active_status
        }
    );

    client.save((err,doc)=>{
        if(err){
            console.log('Error in post data' + err);
        }else{
            res.send(doc);
        }
    })
}


// Delete Client API
exports.deleteClient = (req, res) =>{

    if(ObjectId.isValid(req.params.id)){
        Client.findByIdAndRemove(req.params.id,(err,doc) => {
            if(err){
                console.log('Error in remove data' + err);
            }else{
                res.send(doc);
            }
        });
    }else{
        return res.status(400).send('NO record found with id:' + req.params.id);
    }
    
}


// PUT Client API
exports.updateClient =  (req, res) =>{

    if(ObjectId.isValid(req.params.id)){

        let client = {
                name : req.body.name,
                description : req.body.description,
                website : req.body.website,
                active_status: req.body.active_status
            };
        
        Client.findByIdAndUpdate(req.params.id,{$set: client}, {new:true},(err,doc) => {
            if(err){
                console.log('Error in update data' + err);
            }else{
                res.send(doc);
            }
        });
    }else{
        return res.status(400).send('NO record found with id:' + req.params.id);
    }
    
}



