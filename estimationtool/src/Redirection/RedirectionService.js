import axios from "axios";
import Url from "../shared/service/urls.service";
const RedirectionService = {
    validateShareEstLink:async (estimationId,token)=>{
        let url = Url.user + "/validateshareestlink/" + estimationId + "?token=" + token ;
        return await axios.get(url);
       
    },
//http://localhost:5252/api/v1/user/loginsso?uid=553551555556
    loginsso:async (uid)=>{
        let url = Url.user + "/loginsso?uid=" + uid;
        return await axios.get(url);
       
    }
}
export default RedirectionService;