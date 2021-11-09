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
        
    createRequirement:  function(clientData){
        let url = Url.allestimation+"/requirement";
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.post(url,clientData,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },

     deleteRequirement:  function(actionId){
        let url = Url.allestimation+"/requirement/"+actionId;
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
        let url = Url.allestimation+"/requirement/data/";
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
