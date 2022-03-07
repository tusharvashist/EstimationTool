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
  getAllUserWithRoles: function () {
    let url = URL.getAllUserWithRoles;
    return axios({
      method: "GET",
      url,
    }).catch((err) => {
      throw err.response;
    });
  },
  updateUserRole: function (userId, roleId) {
    let url = URL.updateUserRole;
    return axios({
      method: "PUT",
      url: url + "/" + userId,
      params: { roleId },
    }).catch((err) => {
      throw err.response;
    });
  },
};

export default userRoleManagementService;
