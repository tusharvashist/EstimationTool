const repoProject = require('../repository/project.repository');

const Payload = require('../utils/PayloadModel.js');
const StatusCodes = require('../utils/StatusCodes');
const ResponceMessage = require('../utils/ResponceMessage');

exports.findAllProject = () =>{

  return new Promise(function(resolve,reject){
    var response = {};
    var payload = new Payload();
    // validations
    repoProject.findAllProject((err,doc) => {
      if (err) {
        response = payload.responce(StatusCodes.INTERNAL_SERVER_ERROR, ResponceMessage.INTERNAL_SERVER_ERROR, "");
        resolve(response);
      } else {
        response = payload.responce(StatusCodes.OK, ResponceMessage.RECORD_FETCHED_SUCSSESFULLY, doc);
        resolve(response);
      }
    });
  })

}

exports.findProjectsByClientId = (clientId) => {
      return new Promise(function(resolve, reject){
      var response = {};
      var payload = new Payload();
      
      // validations 
      // if(clientId == null){
      // responce = payload.responce(StatusCodes.OK, ResponceMessage.INTERNAL_SERVER_ERROR, "");
      // reject(responce);
      // }
       
    repoProject.findProjectsByClientId(clientId,(err, doc) =>{
            if (err) {
                response = payload.responce(StatusCodes.INTERNAL_SERVER_ERROR, ResponceMessage.INTERNAL_SERVER_ERROR, "");
                resolve(response);
              } else {
                response = payload.responce(StatusCodes.OK, ResponceMessage.RECORD_FETCHED_SUCSSESFULLY, doc);
                resolve(response);
              }
        
        });
    })
  
}

exports.projectById = (projectId) => {
    return new Promise(function(resolve, reject){
    var response = {};
    var payload = new Payload();
    
  // validations     
  repoProject.projectById(projectId,(err, doc) =>{
          if (err) {
              response = payload.responce(StatusCodes.INTERNAL_SERVER_ERROR, ResponceMessage.INTERNAL_SERVER_ERROR, "");
              resolve(response);
            } else {
              response = payload.responce(StatusCodes.OK, ResponceMessage.RECORD_FETCHED_SUCSSESFULLY, doc);
              resolve(response);
            }
      
      });
  })

}

// Create new project
exports.createProject = (req) =>{
  return new Promise(function(resolve, reject){
    var response = {};
    var payload = new Payload();
    
  // validations     
  repoProject.createProject(req,(err, doc) =>{
          if (err) {
              response = payload.responce(StatusCodes.INTERNAL_SERVER_ERROR, ResponceMessage.INTERNAL_SERVER_ERROR, "");
              resolve(response);
            } else {
              response = payload.responce(StatusCodes.OK, ResponceMessage.RECORD_FETCHED_SUCSSESFULLY, doc);
              resolve(response);
            }
      
      });
  })
}

// delete project
exports.deleteProject = (projectId) =>{
  return new Promise(function(resolve, reject){
    var response = {};
    var payload = new Payload();

    repoProject.deleteProject(projectId,(err, doc) => {
      if (err) {
        response = payload.responce(StatusCodes.INTERNAL_SERVER_ERROR, ResponceMessage.INTERNAL_SERVER_ERROR, "");
        resolve(response);
      } else {
        response = payload.responce(StatusCodes.OK, ResponceMessage.RECORD_FETCHED_SUCSSESFULLY, doc);
        resolve(response);
      }
    })
  })
}

// update project
exports.updateProject = (req) =>{

  return new Promise(function(resolve, reject){
    var response = {};
    var payload = new Payload();
    
  // validations     
  repoProject.updateProject(req.params.id,req,(err, doc) =>{
          if (err) {
              response = payload.responce(StatusCodes.INTERNAL_SERVER_ERROR, ResponceMessage.INTERNAL_SERVER_ERROR, "");
              resolve(response);
            } else {
              response = payload.responce(StatusCodes.OK, ResponceMessage.RECORD_FETCHED_SUCSSESFULLY, doc);
              resolve(response);
            }
      
      });
  })
  
}