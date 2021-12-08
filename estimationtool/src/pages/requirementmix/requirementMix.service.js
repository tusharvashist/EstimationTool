import axios from "axios";
import Url from "../../shared/service/urls.service";

const RequirementMixService = {
  getResourceMixData: function (estid) {
    let url = Url.getResourceMixData;
    return axios.get(url + "/" + estid);
  },
};
export default RequirementMixService;
// '61a857b74ea3ae2a0627800a'
