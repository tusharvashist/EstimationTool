import axios from "axios";
import Url from "../../shared/service/urls.service";
const ClientService = {
  getClientById: function () {
    let url = Url.allClient;
    let clientId = "/614f3c6790a42ca5a74bebf6";
    return axios.get(url + clientId);
  },

  getProjectById: function (projectid) {
    let url = Url.getProjectById;
    //let projectId= "/61715f3b72f71839f8c18a8e";
    let projectId = "/" + projectid;
    return axios.get(url + projectId);
  },

  
  getAllClient: function () {
    let url = Url.allClient;
    return axios.get(url + "?skip=0&limit=10");
  },
  createClient: function (clientData) {
    let url = Url.createClient;
    return axios.post(url, clientData);
  },
  updateClient: function (actionId, clientData) {
    let url = Url.createClient + "/" + actionId;
    return axios.put(url, clientData);
  },
  deleteClient: function (actionId) {
    let url = Url.deleteClient + "/" + actionId;
    return axios.delete(url);
  },
};
export default ClientService;
