import axios from "axios";
import Url from "../../shared/service/urls.service";
const ClientService = {
    getAllClient:  function(){
        let url = Url.allClient;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.get(url+"?skip=0&limit=50",{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },
    createClient:  function(clientData){
        let url = Url.createClient;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.post(url,clientData,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },
    updateClient:  function(actionId,clientData){
        let url = Url.createClient+"/"+actionId;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.put(url,clientData,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
        })
    },
    deleteClient:  function(actionId){
        let url = Url.deleteClient+"/"+actionId;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.delete(url,{
            headers:{
                'Authorization': `Bearer ${token}` 
            },
            data:{}
        })
    }
}
export default ClientService;
