import axios from "axios";
import Url from "../../shared/service/urls.service";
const ReourceMixService = {
 
  getAllTechnologies: function () {
    let url = Url.getAllTechnologiesSkill;
    return axios.get(url);
  }
};
export default ReourceMixService;
