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
    },
        
    createRequirement:  function(requirementData){
        let url = Url.estimationDetail+"/";
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.post(url,requirementData,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },

        updateRequirement:  function(requirementData){
        let url = Url.estimationDetail+"/";
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.put(url,requirementData,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },
        
   updateRequirement:  function(actionId,requirementData){
        let url = Url.estimationDetail+"/"+actionId;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.put(url,requirementData,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
        })
    },
     deleteRequirement:  function(actionId){
        let url = Url.estimationDetail+"/"+actionId;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.delete(url,{
            headers:{
                'Authorization': `Bearer ${token}` 
            },
            data:{}
        })
    },
     
   
    updateEstRequirementData:  function(estrequirementdata){
        let url = Url.estimationDetail+"/data/update";
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.put(url,{ "data": estrequirementdata }, {
            headers:{
                'Authorization': `Bearer ${token}`,
                "content-type": "application/json",
            },
        })
    },
}
export default EstimationService;
