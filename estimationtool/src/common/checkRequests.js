import React from "react";
import axios from "axios";
import history from "./history";
import AuthSer from "../shared/service/auth";

const checkRequests = (Wrapped) => {
  function CheckRequests(props) {
    console.log(props);

    axios.interceptors.response.use(
      function (response) {
        // Do something with response data
        console.log(response);
        return response;
      },
      function (error) {
        switch (error.response.status) {
          case 400:
            console.log("bad request");
            break;
          case 503:
            break;
          case 401:
            console.log("401 JWT expired");
            AuthSer.logout();
            history.push("/login"); //we will redirect user into 503 page
            window.location.reload();
            break;
          default:
            console.log("Error res status undefined");
            break;
        }
        // Do something with response error
        return Promise.reject(error);
      }
    );

    axios.interceptors.request.use(
      (request) => {
        if (!request.url.includes("login") && !request.url.includes("validateshareestlink")) {
          const getToken = localStorage.getItem("auth");
          const token = JSON.parse(getToken).token;
          if (token) {
            request.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // },);

    return <Wrapped {...props} />;
  }
  return CheckRequests;
};

export default checkRequests;
