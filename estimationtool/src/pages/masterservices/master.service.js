import axios from "axios";
import Url from "../../shared/service/urls.service";
const masterServices = {
    getAllEstimationTypes: function(){
        let url = Url.masterEstimationTypes
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.get(url+"?skip=0&limit=5",{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
        })
    }
}
export default masterServices;
