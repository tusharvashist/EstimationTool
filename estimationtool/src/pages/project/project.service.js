import axios from "axios";
import Url from "../../shared/service/urls.service";
const ProjectService = {
    getAllProject:  function(){
        let url = Url.allProject;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.get(url+"?skip=0&limit=20",{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },
    createProject:  function(projectData){
        let url = Url.createProject;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.post(url,projectData,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
           })
    },
    updateProject:  function(actionId,projectData){
        let url = Url.createProject+"/"+actionId;
        const getToken = localStorage.getItem("auth")
        const token = JSON.parse(getToken).token;
        return axios.put(url,projectData,{
            headers:{
                'Authorization': `Bearer ${token}` 
            }
        })
    },
    deleteProject:  function(actionId){
        let url = Url.deleteProject+"/"+actionId;
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
export default ProjectService;
