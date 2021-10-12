import axios from "axios";
import Url from "../../shared/service/urls.service";
const ClientService = {
    
    getClientById:  function(){
        let url = Url.allClient;
        let clientId= "/614f3c6790a42ca5a74bebf6";
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.get(url+clientId,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },
    
    getProjectById:  function(){
        let url = Url.getProjectById;
        let projectId= "/614fefd74d9da71851f36df4";
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.get(url+projectId,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },
    getAllClient:  function(){
        let url = Url.allClient;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.get(url+"?skip=0&limit=10",{
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
