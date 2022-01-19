import axios from "axios";
import Url from "../../shared/service/urls.service";
const masterServices = {
  getAllEstimationTypes: function () {
    let url = Url.masterEstimationTypes;
    return axios.get(url + "?skip=0&limit=5");
  },

  getAllEstimationLocations: function (estHeaderId) {
    let url = Url.getEstimationLocation;
    return axios.get(url + "?estHeaderId=" + estHeaderId);
  },
};
export default masterServices;
