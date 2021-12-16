import axios from "axios";
import Url from "../../shared/service/urls.service";
const ProjectService = {
  getClientById: function (clientid) {
    let url = Url.allClient;
    let clientId = "/" + clientid;
    return axios.get(url + clientId);
  },
  getAllProject: function () {
    let url = Url.allProject;
    return axios.get(url + "?skip=0&limit=100");
  },
  createProject: function (projectData) {
    let url = Url.createProject;
    return axios.post(url, projectData);
  },
  updateProject: function (actionId, projectData) {
    let url = Url.createProject + "/" + actionId;
    return axios.put(url, projectData);
  },
  deleteProject: function (actionId) {
    let url = Url.deleteProject + "/" + actionId;
    return axios.delete(url);
  },
};
export default ProjectService;
