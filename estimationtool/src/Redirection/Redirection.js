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
import logo from "../login/img/celsior_600x600_01_Logo.jpg";
import classes from "./redirection.module.css";
import bgvideo from "../login/img/bgvideo.mp4";
import rightImg from "../login/img/img-right-estimation.png";
import useLoader from "../shared/layout/hooks/useLoader";
import { setAdmin, setContributor, setSuperAdmin } from "../Redux/roleRedux";
import { USER_PERMISSIONS } from "../shared/ui-view/constant/enum";

export default function Redirection(props) {
  const [loaderComponent, setLoader] = useLoader();

  const dispatch = useDispatch();
  let history = useHistory();
  const search = useLocation().search;
  const estimationId = new URLSearchParams(search).get("estimationId");
  const token = new URLSearchParams(search).get("token");

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
      setLoader(true);
      let result = await redirectionService.validateShareEstLink(
        estimationId,
        token
      );

      console.log("result", result);

      if (result.status === 200) {
        var user = result.data.body.user;
        saveDataToRedux(user);
        redirectToEstimationDetail(
          user.estimationDetails._id,
          user.clientDetails.clientName,
          user.projectDetails.projectName
        );
      }
    } catch (error) {
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

  const redirectToEstimationDetail = (
    estimationId,
    clientName,
    projectName
  ) => {
    setLoader(false);
    var url =
      "All-Clients/" + clientName + "/" + projectName + "/Estimation-Detail/";
    dispatch(setEstHeaderId(estimationId));
    history.push(url);

    //http://localhost:3000/All-Clients/Star-Link/Apple/Estimation-Detail/
    // dispatch(setEstHeaderId(augData._id))
    // let url = "/Recent-Estimations";
    //   history.push(url);
  };

  return (
    <Grid
      container
      className={`${classes.h100} ${classes.loginwrp}`}
      direction="row"
    >
      <video autoPlay muted loop className={classes.fullbgvideo}>
        <source src={bgvideo} type="video/mp4" />
      </video>
      <Grid item xs={6} className={classes.bgimg}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.bgmask}
        >
          <BorderedContainer className={classes.loginwidget}>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.h100}
            >
              <div>
                <div className={classes.logoContainer}>
                  <img src={logo} />
                </div>
                <h1 className={classes.tagline}>
                  Welcome to{" "}
                  <span className={classes.toolname}>EstimationTool</span>
                </h1>
                <div className={classes.loadercontainer}>
                  <p>Please wait while we are setting up tool for you...</p>
                  <div className={classes.loader}>{loaderComponent}</div>
                </div>
              </div>
            </Grid>
          </BorderedContainer>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        alignItems={"center"}
        className={classes.loginwidget_container}
      >
        <img width={"600px"} src={rightImg} />
      </Grid>
    </Grid>
  );
}
