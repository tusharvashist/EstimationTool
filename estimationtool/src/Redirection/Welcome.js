import React from "react";
import classes from "./redirection.module.css";

import Grid from "@material-ui/core/Grid";
import BorderedContainer from "../shared/ui-view/borderedContainer/BorderedContainer";

const Welcome = (props) => {
  return (
    <Grid
      container
      className={`${classes.h100} ${classes.loginwrp}`}
      direction="row"
    >
      <video autoPlay muted loop className={classes.fullbgvideo}>
        <source src={props.bgvideo} type="video/mp4" />
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
                  <img src={props.logo} />
                </div>
                <h1 className={classes.tagline}>
                  Welcome to{" "}
                  <span className={classes.toolname}>EstimationTool</span>
                </h1>
                <div className={classes.loadercontainer}>
                  <p>Please wait while we are setting up tool for you...</p>
                  <div className={classes.loader}>{props.loaderComponent}</div>
                </div>
                <br />
                <p className={classes.message}>
                  <i>Message: {props.status}</i>
                </p>
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
        <img width={"600px"} src={props.rightImg} />
      </Grid>
    </Grid>
  );
};

export default Welcome;
