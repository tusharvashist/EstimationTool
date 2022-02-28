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
