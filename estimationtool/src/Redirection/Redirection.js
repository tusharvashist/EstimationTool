import React, {useEffect,useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import BorderedContainer from "../shared/ui-view/borderedContainer/BorderedContainer";
import { useLocation,useHistory } from "react-router-dom";
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

export default function Redirection(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const search = useLocation().search;
  const estimationId = new URLSearchParams(search).get('estimationId');
  const token = new URLSearchParams(search).get('token');
  
  useEffect(() => {
    validateShareEstLink(estimationId, token);
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



  const validateShareEstLink = async (estimationId, token) => {
    try {
  
    
    let result = await redirectionService.validateShareEstLink(estimationId, token);

    console.log("result", result);

    if (result.status === 200) {
       await AuthSer.login(result.data.body.user);
        dispatch(setEmail(result.data.body.user.email));
        dispatch(setFirstName(result.data.body.user.firstName));
        dispatch(setLastName(result.data.body.user.lastName));
        dispatch(
          setFullName(
            result.data.body.user.firstName + " " + result.data.body.user.lastName
          )
        );
      
        // dispatch(setRole(result.data.body.user.roles.roleName));
        // const permissions = mapPermissions(result.data.body.user.RolePermission);
        // dispatch(setRolePermission(permissions));
       
        // if (result.data.body.user.roles.roleName === "Admin") {
        //   dispatch(setAdmin(true));
        // } else if (result.data.body.user.roles.roleName === "Super Admin") {
        //   dispatch(setSuperAdmin(true));
        // } else {
        //   dispatch(setContributor(true));
        // }
      
      redirectToEstimationDetail(result.data.body.user.estimationDetails._id,
        result.data.body.user.clientDetails.clientName,
        result.data.body.user.projectDetails.projectName
      );
    }
      } catch (error) {
      console.log("Error", error);
      }
  }

  const redirectToEstimationDetail = (estimationId,clientName,projectName) => {
    var url = "All-Clients/" + clientName + "/" + projectName + "/Estimation-Detail/";
    dispatch(setEstHeaderId(estimationId))
    history.push(url);
    
//http://localhost:3000/All-Clients/Star-Link/Apple/Estimation-Detail/
// dispatch(setEstHeaderId(augData._id))
  // let url = "/Recent-Estimations";
  //   history.push(url);
}

  return (
    <Grid container className="h-100 login-wrp" direction="row">
   <Grid item xs={6} className="bg-img">
        <Grid
          container
          justify="center"
          alignItems="center"
          className="bg-mask"
        ></Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        alignItems={"center"}
        className="login-widget_container"
      >
        <BorderedContainer className="login-widget">
          <Grid
            container
            justify="center"
            alignItems="center"
            className="h-100"
          >
                  <div class="loading">
              <p>Please wait.. </p>
            <span><i></i><i></i></span>
        </div>
           
          </Grid>
        </BorderedContainer>
      </Grid> 
    </Grid>
  );
}
