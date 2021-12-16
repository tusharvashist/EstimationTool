import axios from "axios";
import Url from "../../shared/service/urls.service";
const ClientService = {
    
    getClientById:  function(clientid){
        let url = Url.allClient;
        let clientId= "/"+clientid;       
        return axios.get(url+clientId)
    },
    getAllClient:  function(){
        let url = Url.allClient;       
        return axios.get(url+"?skip=0&limit=10")
    },
    createClient:  function(clientData){
        let url = Url.createClient;       
        return axios.post(url,clientData)
    },
    updateClient:  function(actionId,clientData){
        let url = Url.createClient+"/"+actionId;        
        return axios.put(url,clientData)
    },
    deleteClient:  function(actionId){
        let url = Url.deleteClient+"/"+actionId;        
        return axios.delete(url)
    }
}
export default ClientService;
