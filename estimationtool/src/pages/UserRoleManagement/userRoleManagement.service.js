import axios from "axios";
import URL from "../../shared/service/urls.service.js";

const userRoleManagementService = {
  getAllRoles: function () {
    let url = URL.getAllRoles;
    return axios({
      method: "GET",
      url,
    }).catch((err) => {
      throw err.response;
    });
  },
};

export default userRoleManagementService;
