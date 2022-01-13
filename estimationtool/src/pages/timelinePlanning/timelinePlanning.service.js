import axios from "axios";
import Url from "../../shared/service/urls.service";

const TimelinePlanningService = {
    getTimelinePlanningData: function (estid) {
    let url = Url.getTimelinePlanningData;
    return axios.get(url + "/" + estid);
  },
};
export default TimelinePlanningService;
// '61a857b74ea3ae2a0627800a'
