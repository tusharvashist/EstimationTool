import axios from "axios";
import Url from "../../shared/service/urls.service";
const ShareEstimateDialogService = {
  getRole: function () {
    let url = Url.shareRoleEstimate + "/sharing";
    return axios.get(url);
  },
  
  getPCUserDetails: function (searchText) {
    var config = {
      method: 'get',
      url:  Url.getPCUserDetails + "/Parm?Vari=" + searchText,
      headers: { 
        'secret_key': 'I1B5ZENvcmVFVDIwMjI='
      }
      };
    return axios(config)
  },
  
       
  share: function (requestJson) {
    let url = Url.shareEstimate;
    return axios.post(url, requestJson);
  },
};
export default ShareEstimateDialogService;
