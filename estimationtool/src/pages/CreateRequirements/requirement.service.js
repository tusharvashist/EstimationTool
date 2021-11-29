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
    }
}

export default RequirementService;