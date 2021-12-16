import axios from "axios";
import Url from "../../shared/service/urls.service";
const EstimationService = {
    
    getById: function (actionId) {

        let url = Url.allestimation+"/"+actionId;
        return axios.get(url);
    },

    getRequirementDataById: function (actionId) {
        let url = Url.estimationDetail+"/get/data/"+actionId;        
        return axios.get(url);
    },
    
    createRequirement: function (requirementData) {
        let url = Url.estimationDetail+"/";        
        return axios.post(url,requirementData);
    },

    updateRequirement:  function(requirementData){
        let url = Url.estimationDetail+"/";        
        return axios.put(url,requirementData);
    },
        
    updateRequirement:  function(actionId,requirementData){
        let url = Url.estimationDetail+"/"+actionId;        
        return axios.put(url,requirementData);
    },

    updateManualCallAttribute:  function(actionId,requirementData){
        let url = Url.estimationDetail+"/update/ManualCallAttribute/"+actionId;        
        return axios.put(url,requirementData);
    },
    
    deleteRequirement: function (actionId) {
        let url = Url.estimationDetail+"/"+actionId;        
        return axios.delete(url);
    },
     
    updateEstRequirementData:  function(estrequirementdata){
        let url = Url.estimationDetail+"/data/update";        
        return axios.put(url,{ "data": estrequirementdata })
    },

    mapHeaderToMultipleRequirement:  function(estHeaderId, multipleRequirement){
        let url = Url.estimationDetail+"/map/Header/ToMultipleRequirement/"+estHeaderId ;        
        return axios.put(url,{ "data": multipleRequirement })
    },
}
export default EstimationService;