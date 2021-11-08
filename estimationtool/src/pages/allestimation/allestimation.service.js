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
    },

    saveEstimationBasicDetail: function(estimationConfigBasicDetailReq){
        let url = Url.allestimation
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.post(url,estimationConfigBasicDetailReq,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },

    updateEstimationBasicDetail: function(estimationHeaderId,estimationConfigBasicDetailReq){
        let url = Url.allestimation
        let actionId = "/"+estimationHeaderId
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.put(url+actionId,estimationConfigBasicDetailReq,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },

    saveEffortAttribute: function(data){
        let url = Url.allEffortAttribute
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.post(url,data,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },
    saveCalculativeAttribute: function(data){
        let url = Url.allCalculativeAttribute
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.post(url,data,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    }
}
export default AllestimationService;
