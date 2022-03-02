import axios from "axios";
import Url from "../../shared/service/urls.service";
const ShareEstimateDialogService = {
  getRole: function () {
    let url = Url.shareRoleEstimate + "/sharing";
    return axios.get(url);
  },
  
  getPCUserDetails: function (searchText) {
    let url = "http://10.4.4.95:9000/api/OMS/GetPCUserDetails/Parm?Vari=" + searchText;
    return axios.get(url);
  },
  
  share: function (requestJson) {
    let url = Url.shareEstimate;
    return axios.post(url, requestJson);
  },
};
export default ShareEstimateDialogService;
