import axios from "axios";
import Url from "../../shared/service/urls.service";
const ShareEstimateDialogService = {
  getRole: function () {
    let url = Url.shareEstimate + "/sharing";
    return axios.get(url);
  },

};
export default ShareEstimateDialogService;
