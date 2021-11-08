import axios from "axios";
import Url from "../../shared/service/urls.service";
const ClientService = {
    
   
    createAttribute: function(attributeData){
        let url = Url.createAttribute;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.post(url,attributeData,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },
// TODO: estimationHeaderID optional
    getAllAttribute:  function(id,headerId){
        let url = Url.createAttribute;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.get(url+`?esttype=`+id+`&estheaderid=`+headerId,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },

    getAllCalculativeAttribute: function(){
        let url = Url.getCalculativeAttribute;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.get(url+"?skip=0&limit=12",{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },

    createCalAttribute: function(attributeData){
        let url = Url.getCalculativeAttribute;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.post(url,attributeData,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    }
}
export default ClientService;
