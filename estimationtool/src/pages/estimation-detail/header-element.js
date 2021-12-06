import { Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Header from "../../shared/layout/Header/Header";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";

export const EstimationHeader = (props) => {
  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={12} sm={4}>
          <Header
            iconname="estimation"
            title="Estimation Name"
            name={props.data.estName}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Header
            iconname="estimationType"
            title="Estimation Type"
            name={props.data.estTypeId.estType}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Header
            iconname="effortUnit"
            title="Effort Unit"
            name={props.data.effortUnit}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Header
            iconname="cost"
            title="Total Cost"
            name={props.data.totalCost}
          />
        </Grid>
      </Grid>
    </>
  );
};

export const ClientProjectHeader = (props) => {
  return (
    <>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Header
            iconname="client"
            title="Client Name"
            name={props.client.clientName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Header
            iconname="link"
            title="Client Website"
            website={props.client.website}
          />
        </Grid>
      </Grid>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Header
            iconname="project"
            title="Project Name"
            name={props.project.projectName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Header
            iconname="business"
            title="Business Domain"
            name={props.project.domain}
          />
        </Grid>
      </Grid>
    </>
  );
};
