import axios from "axios";
import Url from "../../shared/service/urls.service";
const EstimationService = {
    
    // getEstimationById:  function(){
    //     let url = Url.allEstimation;
    //     let EstimationId= "/614f3c6790a42ca5a74bebf6";
    //     const getToken = localStorage.getItem("auth")
    //     const token = JSON.parse(getToken).token;
    //     return axios.get(url+EstimationId,{
    //         headers:{
    //             'Authorization': `Bearer ${token}` 
    //         }
    //        })
    // },
    
    // getProjectById:  function(projectid){
    //     let url = Url.getProjectById;
    //     //let projectId= "/61715f3b72f71839f8c18a8e";
    //     let projectId = "/"+projectid;
    //     const getToken = localStorage.getItem("auth")
    //     const token = JSON.parse(getToken).token;
    //     return axios.get(url+projectId,{
    //         headers:{
    //             'Authorization': `Bearer ${token}` 
    //         }
    //        })
    // },
    // getAllEstimation:  function(){
    //     let url = Url.allEstimation;
    //     const getToken = localStorage.getItem("auth")
    //     const token = JSON.parse(getToken).token;
    //     return axios.get(url+"?skip=0&limit=10",{
    //         headers:{
    //             'Authorization': `Bearer ${token}` 
    //         }
    //        })
    // },
    // createEstimation:  function(EstimationData){
    //     let url = Url.createEstimation;
    //     const getToken = localStorage.getItem("auth")
    //     const token = JSON.parse(getToken).token;
    //     return axios.post(url,EstimationData,{
    //         headers:{
    //             'Authorization': `Bearer ${token}` 
    //         }
    //        })
    // },
    // updateEstimation:  function(actionId,EstimationData){
    //     let url = Url.createEstimation+"/"+actionId;
    //     const getToken = localStorage.getItem("auth")
    //     const token = JSON.parse(getToken).token;
    //     return axios.put(url,EstimationData,{
    //         headers:{
    //             'Authorization': `Bearer ${token}` 
    //         }
    //     })
    // },

    delete:  function(actionId){
        let url = Url.allestimation+"/"+actionId;        
        return axios.delete(url);
    }
}
export default EstimationService;
