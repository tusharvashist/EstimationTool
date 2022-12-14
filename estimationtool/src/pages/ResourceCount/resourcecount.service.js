import axios from "axios";
import Url from "../../shared/service/urls.service";

const ResourceCountService = {
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

  getResourceMasterRole: function (resourceCountId) {
    let url = Url.getResourceRoleMaster;
    if (resourceCountId === undefined) {
      return axios.get(url);
    } else {
      return axios.get(url + `?resourceCountId=` + resourceCountId);
    }
  },

  updateResourceRole: function (req) {
    let url = Url.updateResourceRole;
    return axios.put(url, req);
  },

  getResourceRoleCountOnUpdate: function (req) {
    let url = Url.getResourceRoleCountOnUpdate;
    return axios.get(url, { params: { estResourceCountID: req } });
  },
};

export default ResourceCountService;
// '61a857b74ea3ae2a0627800a'
