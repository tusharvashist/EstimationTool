import axios from "axios";
import Url from "../../shared/service/urls.service";
const EstimationService = {
    
    getById: function (actionId) {

        let url = Url.allestimation+"/"+actionId;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        console.log("URL: ", url);
        return axios.get(url,{
            headers:{
                'Authorization': `Bearer ${token}` 
            },
            data:{}
        })
    }
        

}
export default EstimationService;
