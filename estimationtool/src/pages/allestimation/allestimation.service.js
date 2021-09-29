import axios from "axios";
import Url from "../../shared/service/urls.service";
const AllestimationService = {
    getAllEstimation:  function(){
        let url = Url.allestimation;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.get(url+"?skip=0&limit=5",{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    }
}
export default AllestimationService;
