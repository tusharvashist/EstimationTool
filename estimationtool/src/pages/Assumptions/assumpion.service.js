import axios from "axios";
import Url from "../../shared/service/urls.service";

const assumptionService = {
  importAllAssumptions: function () {
    let url = Url.allAssumptions;
    return axios({
      method: "GET",
      url,
    });
  },
  importAllAssumptionTags: function () {
    let url = Url.allAssumptionsTags;
    return axios({
      method: "GET",
      url,
    });
  },
  getLinkAssumptionWithEstimation: function (estHeaderId) {
    let url = Url.allAssumptions + "/getLinkAssumptionWithEstimation/" + estHeaderId;
    return axios({
      method: "GET",
      url,
    });
  },
  mapWithEstimation: function (assumptionId, estHeaderId) {
    let url = Url.allAssumptionsTags + "/mapWithEstimation/" + assumptionId;
    return axios.put(url, estHeaderId);
  },
  addAssumption: function (assumption, assumptionTag) {
    let url = Url.allAssumptions;
    return axios({
      method: "POST",
      url,
      data: {
        assumption,
        assumptionTag,
      },
    });
  },
};

export default assumptionService;
