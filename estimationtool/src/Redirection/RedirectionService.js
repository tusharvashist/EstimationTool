import axios from "axios";
import Url from "../shared/service/urls.service";
const RedirectionService = {
    validateShareEstLink:async (estimationId,token)=>{
        let url = Url.user + "/validateshareestlink/" + estimationId + "?token=" + token ;
        return await axios.get(url);
       
    }
}
export default RedirectionService;