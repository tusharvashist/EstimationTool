import axios from "axios";
import Url from "../../shared/service/urls.service";
const AllestimationService = {
  getAllEstimation: function () {
    let url = Url.allestimation;
    return axios.get(url + "?skip=0&limit=5");
  },

  saveEstimationBasicDetail: function (estimationConfigBasicDetailReq) {
    let url = Url.allestimation;
    return axios.post(url, estimationConfigBasicDetailReq);
  },

  updateEstimationBasicDetail: function (
    estimationHeaderId,
    estimationConfigBasicDetailReq
  ) {
    let url = Url.allestimation;
    let actionId = "/" + estimationHeaderId;
    return axios.put(url + actionId, estimationConfigBasicDetailReq);
  },

  saveEffortAttribute: function (data) {
    let url = Url.allEffortAttribute;
    return axios.post(url, data);
  },
  saveCalculativeAttribute: function (data) {
    let url = Url.allCalculativeAttribute;
    return axios.post(url, data);
  },

  getEstimationBasicDetail: function (estimationHeaderId) {
    let url = Url.allestimation;
    let actionId = "/" + estimationHeaderId;
    return axios.get(url + actionId);
  },
};
export default AllestimationService;
