import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import BorderedContainer from "../shared/ui-view/borderedContainer/BorderedContainer";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setEstHeaderId } from "../Redux/estimationHeaderId";
import redirectionService from "./RedirectionService";
import AuthSer from "../shared/service/auth";
import {
  setEmail,
  setFirstName,
  setLastName,
  setFullName,
  setRole,
  setRolePermission,
} from "../Redux/loginRedux";

import { setAdmin, setContributor, setSuperAdmin } from "../Redux/roleRedux";
import { USER_PERMISSIONS } from "../shared/ui-view/constant/enum";
import Welcome from "./Welcome";

import logo from "../login/img/celsior_600x600_01_Logo.jpg";
import bgvideo from "../login/img/bgvideo.mp4";
import rightImg from "../login/img/img-right-estimation.png";
import useLoader from "../shared/layout/hooks/useLoader";

export default function SSORedirection(props) {
  const [loaderComponent, setLoader] = useLoader();
  const dispatch = useDispatch();
  let history = useHistory();
  const search = useLocation().search;
  const uid = new URLSearchParams(search).get("uid");
  //  const token = new URLSearchParams(search).get('token');
  const [status, setStatus] = useState("");
  var referrer = document.referrer;
  console.log("referrer url", referrer); 
  useEffect(() => {
    if (process.env.REACT_APP_REFERRAL === referrer) {
        loginsso(uid);
    } else {
      setStatus( "Unauthorized access!")
    }
  }, []);

  const mapPermissions = (permissionArray) => {
    const permissionObj = {};
    const finalPermissions = {};
    for (let perm of permissionArray) {
      permissionObj[perm.token] = true;
    }
    for (let userP in USER_PERMISSIONS) {
      finalPermissions[USER_PERMISSIONS[userP]] = !!permissionObj[userP];
    }
    return { ...finalPermissions };
  };

  const loginsso = async (uid) => {
    try {
      setLoader(true);
      let result = await redirectionService.loginsso(uid);
      console.log("result", result);
      if (result.status === 200) {
        setLoader(false);
        setStatus("Valid user.");
        var user = result.data.body.user;
        saveDataToRedux(user);
        redirectDashbord();
        // redirectToEstimationDetail(user.estimationDetails._id,
        //   user.clientDetails.clientName,
        //   user.projectDetails.projectName
        // );
      }
    } catch (error) {
      setStatus("Invalid user.");
      console.log("Error", error);
    }
  };

  const saveDataToRedux = async (user) => {
    await AuthSer.login(user);
    dispatch(setEmail(user.email));
    dispatch(setFirstName(user.firstName));
    dispatch(setLastName(user.lastName));
    dispatch(setFullName(user.firstName + " " + user.lastName));

    if (user.roles !== undefined) {
      dispatch(setRole(user.roles.roleName));
      const permissions = mapPermissions(user.RolePermission);
      dispatch(setRolePermission(permissions));

      if (user.roles.roleName === "Admin") {
        dispatch(setAdmin(true));
      } else if (user.roles.roleName === "Super Admin") {
        dispatch(setSuperAdmin(true));
      } else {
        dispatch(setContributor(true));
      }
    }
  };
  const redirectDashbord = () => {
    let url = "/Recent-Estimations";
    history.push(url);
  };

  //   const redirectToEstimationDetail = (estimationId,clientName,projectName) => {
  //     var url = "All-Clients/" + clientName + "/" + projectName + "/Estimation-Detail/";
  //     dispatch(setEstHeaderId(estimationId))
  //     history.push(url);

  // //http://localhost:3000/All-Clients/Star-Link/Apple/Estimation-Detail/
  // // dispatch(setEstHeaderId(augData._id))
  //   // let url = "/Recent-Estimations";
  //   //   history.push(url);
  // }

  return (
    <Welcome
      bgvideo={bgvideo}
      logo={logo}
      loaderComponent={loaderComponent}
      status={status}
      rightImg={rightImg}
    />
  );
}
