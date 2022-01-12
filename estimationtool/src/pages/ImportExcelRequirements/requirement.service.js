import axios from "axios";
import Url from "../../shared/service/urls.service";

import FileDownload from "js-file-download";

var FormData = require('form-data');

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

    allRequirementDelete: function (actionId) {
        let url = Url.estimationDetail+"/allRequirement/"+actionId;        
        return axios.delete(url);
    },

    uploadExcel: function (file,actionId) {
        let formData = new FormData();
        formData.append('file', file);
        let url = Url.uploadExcel + "/" + actionId; 
        return axios.post(url, formData, {});
    },
    
    getTemplate: function () {
    let url = Url.uploadExcel + "/getTemplate"
    return axios({ url, responseType: "blob", method: "GET" }).then((res) => {
      FileDownload(res.data, "Estimation.xlsx");
    });
  },
}

export default RequirementService;