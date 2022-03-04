import axios from "axios";
import Url from "../shared/service/urls.service";
const RedirectionService = {
    validateShareEstLink:async (estimationId,token)=>{
        // let url = Url.user + "/validateshareestlink/" + estimationId + "?token=" + token ;
        // return await axios.get(url);
       


      var config = {
      method: 'get',
      url:  Url.user + "/validateshareestlink/" + estimationId + "?token=" + token,
      headers: { 
        'secret_key': 'I1B5ZENvcmVFVDIwMjI='
      }
      };
    return axios(config)
    }
}
export default RedirectionService;