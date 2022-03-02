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
  mapWithEstimation: function ( estHeaderId,assumptionsList) {
    let url = Url.allAssumptions + "/mapWithEstimation/" + estHeaderId;
    return axios.put(url, assumptionsList);
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
  updateAssumption: function (assumptionName, assumptionTag, assumptionId) {
    let url = Url.allAssumptions;
    return axios({
      method: "PUT",
      url,
      data: {
        assumptionName,
        assumptionTag,
        assumptionId,
      },
    });
  },
};

export default assumptionService;
