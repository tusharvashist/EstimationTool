import axios from "axios";
import Url from "../../shared/service/urls.service";
const ReourceMixService = {

  getAllTechnologies: function () {
    let url = Url.getAllTechnologiesSkill;
    return axios.get(url);
  },

  getResourceCount: function (estheaderid) {
    let url = Url.getResourceCount;
    return axios.get(url + `?estheaderid=` + estheaderid);
  },

  getResourceCountAll: function (estheaderid) {
    let url = Url.getResourceCountAll;
    return axios.get(url + `?estheaderid=` + estheaderid);
  },


  updateTechnology: function (req) {
    let url = Url.updateTechnology;
    return axios.put(url, req);
  },

  

  getResourceMasterRole: function (estheaderid) {
    let url = Url.getResourceRoleMaster;
    return axios.get(url);
  },


  updateResourceRole: function (req) {
    let url = Url.updateResourceRole;
    return axios.put(url, req);
  }
};
export default ReourceMixService;
// '61a857b74ea3ae2a0627800a'