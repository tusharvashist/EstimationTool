//const Project = require('../models/PayloadModel');
//const APIResponse = require('../models/APIResponse');
//const ObjectId = require('mongoose').Types.ObjectId;
const projectService = require('../services/project.service');

// Retrieve all project from the database.
exports.findAllProject =  (req, res) => {
      projectService.findAllProject()
     .then(function (response){res.send(response)})
     .catch(function (response){res.send(response)})
  };

exports.findProjectsByClientId = (req,res) => {
     var clientId = req.query.clientid;
     projectService.findProjectsByClientId(clientId)
     .then(function (response){res.send(response)})
     .catch(function (response){res.send(response)})
  }

// Retrieve single client from the database.
exports.projectById =  (req, res) => {  
     var projectId = req.params.id;
     projectService.projectById(projectId)
     .then(function (response){res.send(response)})
     .catch(function (response){res.send(response)})
 };

// Create new project
exports.createProject = (req, res) =>{
    projectService.createProject(req)
    .then(function (response){res.send(response)})
    .catch(function (response){res.send(response)})
}


// Delete project API
exports.deleteProject = (req, res) =>{
    projectService.deleteProject(req.params.id)
    .then(function (response){res.send(response)})
    .catch(function (response){res.send(response)})
}


// PUT project API
exports.updateProject = (req,res) => {
    projectService.updateProject(req)
    .then(function (response){res.send(response)})
    .catch(function (response){res.send(response)})
}



