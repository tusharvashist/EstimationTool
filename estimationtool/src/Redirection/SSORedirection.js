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

export default function SSORedirection(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  const search = useLocation().search;
  const uid = new URLSearchParams(search).get('uid');
//  const token = new URLSearchParams(search).get('token');
  const [status, setStatus] = useState("");
  
  useEffect(() => {
    loginsso(uid);
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
    let result = await redirectionService.loginsso(uid);
    console.log("result", result);
      if (result.status === 200) {
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
  }

  const saveDataToRedux = async(user)=>{

       await AuthSer.login(user);
        dispatch(setEmail(user.email));
        dispatch(setFirstName(user.firstName));
        dispatch(setLastName(user.lastName));
        dispatch(
          setFullName(
            user.firstName + " " + user.lastName
          )
        );
    
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
     
  }
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
              <p>Please wait..</p>
                <p>{status}</p>
            <span><i></i><i></i></span>
        </div>
           
          </Grid>
        </BorderedContainer>
      </Grid> 
    </Grid>
  );
}
