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
            title="Client Details"
            details={[
              { name: props.client.clientName },
              { website: props.client.website },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Header
            iconname="project"
            title="Project Details"
            details={[
              { name: props.project.projectName },
              { name: props.project.domain },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
};
