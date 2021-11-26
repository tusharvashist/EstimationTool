import { Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";


export const EstimationHeader = (props) => {

  return (
     <BorderedContainer>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={10} sm={4}>
            <p>
              {" "}
              <span className="title-stl"> Estimation Name : </span>{" "}
              {props.data.estName}
            </p>
          </Grid>
          <Grid item xs={10} sm={6}>
            <p>
              {" "}
              <span className="title-stl"> Estimation Type :</span>{" "}
              {props.data.estTypeId.estType}
            </p>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className="block-section"
        >
          <p>
            <span className="section-title"></span>
          </p>
        </Grid>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={10} sm={4}>
            <p>
              <span className="title-stl"> Effort Unit : </span>
              {props.data.effortUnit}
            </p>
          </Grid>
          <Grid item xs={10} sm={6}>
            <p>
              <span className="title-stl"> Total Cost :</span> ${" "}
              {props.data.totalCost}{" "}
            </p>
          </Grid>
        </Grid>
      </BorderedContainer>
  );
};

export const ClientProjectHeader = (props) => {

  return (
    <BorderedContainer>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={10} sm={4}>
            <p>
              {" "}
              <span className="title-stl"> Client Name :</span>{" "}
              {props.client.clientName}
            </p>
          </Grid>
          <Grid item xs={10} sm={6}>
            <p>
              {" "}
              <span className="title-stl"> Client Website :</span>{" "}
              <a target="blank" href={`//${props.client.website}`}>
                {" "}
                {props.client.website}
              </a>
            </p>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className="block-section"
        >
          <p>
            <span className="section-title"></span>
          </p>
        </Grid>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={10} sm={4}>
            <p>
              <span className="title-stl"> Project Name : </span>
              {props.project.projectName}
            </p>
          </Grid>
          <Grid item xs={10} sm={6}>
            <p>
              <span className="title-stl"> Business Domain :</span>{" "}
              {props.project.domain}{" "}
            </p>
          </Grid>
        </Grid>
      </BorderedContainer>
  );
};

