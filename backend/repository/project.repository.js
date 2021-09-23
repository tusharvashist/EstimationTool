const Project = require('../models/ProjectModel');
//const ObjectId = require('mongoose').Types.ObjectId;


exports.findAllProject =  (callback) => {
   Project.find((err, doc) =>{
   return callback(err,doc);
});
}

exports.findProjectsByClientId =  (clientId,callback) => {
    var _query = { client_id: clientId}
     Project.find(_query,(err, doc) =>{
     return callback(err,doc);
  });
}

exports.projectById =  (projectId,callback) => {
   Project.findById(projectId,(err, doc) =>{  
  return callback(err,doc);
});
}

exports.createProject =  (req,callback) => {
  let project = new Project(
    {
        name : req.body.name,
        description : req.body.description,
        client_id : req.body.client_id,
        active_status: req.body.active_status
    }
);
project.save((err, doc) =>{  
 return callback(err,doc);
});
}

exports.deleteProject =  (projectId,callback) => {
   Project.findByIdAndRemove(projectId,(err, doc) =>{
   return callback(err,doc);
});
}

exports.updateProject = (projectId,req,callback) =>{
  let project = {
    name : req.body.name,
    description : req.body.description,
    client_id : req.body.client_id,
    active_status: req.body.active_status
  };

Project.findByIdAndUpdate(projectId,{$set: project}, {new:true},(err,doc) => {
  return callback(err,doc);
});
}
