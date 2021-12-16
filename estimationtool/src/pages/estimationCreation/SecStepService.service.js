import axios from "axios";
import Url from "../../shared/service/urls.service";
const ClientService = {
  createAttribute: function (attributeData) {
    let url = Url.createAttribute;
    return axios.post(url, attributeData);
  },
  // TODO: estimationHeaderID optional
  getAllAttribute: function (id, headerId) {
    let url = Url.createAttribute;
    return axios.get(url + `?esttype=` + id + `&estheaderid=` + headerId);
  },

  getAllCalculativeAttribute: function (typeId, headerId) {
    let url = Url.getCalculativeAttribute;
    return axios.get(url + `?esttype=` + typeId + `&estheaderid=` + headerId);
  },
  getAllRequirementTag: function () {
    let url = Url.getRequirementTag;
    return axios.get(url);
  },
  createCalAttribute: function (attributeData) {
    let url = Url.saveCalcAttribute;
    return axios.post(url, attributeData);
  },
  updateCalculativeAttribute: function () {}

};
export default ClientService;
