import axios from "axios";
import Url from "../../shared/service/urls.service";
const RequirementService = {
    
    getTagsType: function () {
        let url = Url.getRequirementTag + "/get/TagsType" ;
        return axios.get(url);
    },
        
    getRequirementWithQuery: function (projectId) {
        let url = Url.estimationDetail + "/get/Requirement/With/Query/"+ projectId ;
        return axios.get(url);
    },

    getUnpairedRequirementEstimation: function (projectId,estHeader) {

        let url = Url.estimationDetail + "/getUnpairedRequirementEstimation?projectId="+ projectId+"&estHeader="+estHeader;
        return axios.get(url);
    },

    allRequirementDelete: function (actionId,requirementList) {
        let url = Url.estimationDetail+"/allRequirement/"+actionId;        
        return axios.delete(url,requirementList);
    },

    deleteSelectedRecords: function (actionId,requirementList) {
        let url = Url.estimationDetail+"/deleteSelectedRequirement/"+actionId;        
        return axios.post(url, requirementList, {});
    },
}

export default RequirementService;