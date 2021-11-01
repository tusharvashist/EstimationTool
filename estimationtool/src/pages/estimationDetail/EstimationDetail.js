import { Button, Container } from "@material-ui/core";
import { Box, Grid } from "@material-ui/core";
import React from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { EditOutlined, Add, SaveOutlined } from "@material-ui/icons";
import MaterialTable from "material-table";
import "./EstimationDetail.css";

const EstimationDetail = () => {
  return (
    <React.Fragment>
      <BorderedContainer>
        <Box sx={{ width: "100%" }}>
          <h2>Estimation Details</h2>
        </Box>
      </BorderedContainer>
      <Container>
        <Box sx={{ width: "100%" }} className="estimation-detail-box">
          <Button variant="outlined" className="estimation-detail-button">
            {" "}
            <EditOutlined /> Edit Configuration
          </Button>
        </Box>
      </Container>
      <BorderedContainer>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={10} sm={4}>
            <p>
              {" "}
              <span className="title-stl"> Estimation Name : </span>{" "}
              Rom-BioIQ-ABCPortal
            </p>
          </Grid>
          <Grid item xs={10} sm={6}>
            <p>
              {" "}
              <span className="title-stl"> Estimation Type :</span> ROM
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
              Day
            </p>
          </Grid>
          <Grid item xs={10} sm={6}>
            <p>
              <span className="title-stl"> Total Cost :</span> $100000{" "}
            </p>
          </Grid>
        </Grid>
      </BorderedContainer>
      <BorderedContainer>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={10} sm={4}>
            <p>
              {" "}
              <span className="title-stl"> Client Name :</span> BioIQ
            </p>
          </Grid>
          <Grid item xs={10} sm={6}>
            <p>
              {" "}
              <span className="title-stl"> Client Website :</span>{" "}
              <a href="#">http//:www.bioiq.com</a>
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
              ABC Portal
            </p>
          </Grid>
          <Grid item xs={10} sm={6}>
            <p>
              <span className="title-stl"> Business Domain :</span> ABC Portal{" "}
            </p>
          </Grid>
        </Grid>
      </BorderedContainer>
      <Container>
        <Box sx={{ width: "100%" }} className="estimation-detail-box">
          <Button variant="outlined" className="estimation-detail-button">
            {" "}
            <Add /> Add Requirements
          </Button>
        </Box>
      </Container>
      <BorderedContainer>
        <MaterialTable
          style={{ boxShadow: "none" }}
          title="Estimation Efforts"
          columns={[
            {
              title: "Requirement",
              field: "Requirement",
              editable: false,
            },
            { title: "Description", field: "Description", editable: false },
            {
              title: "UI(Days)",
              field: "UI",
              type: "numeric",
            },
            {
              title: "Frontend(Days)",
              field: "Frontend",
              type: "numeric",
            },
            {
              title: "Backend(Days)",
              field: "Backend",
              type: "numeric",
            },
          ]}
          data={[
            {
              Requirement: "Clients",
              Description: "POC",
              UI: 12,
              Frontend: 63,
              Backend: 63,
            },
            {
              Requirement: "Projects",
              Description: "POC",
              UI: 12,
              Frontend: 63,
              Backend: 63,
            },
          ]}
          editable={{
            onBulkUpdate: (changes) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            search: false,
            headerStyle: {
              backgroundColor: "#e5ebf7",
              fontWeight: "bold",
              fontSize: "0.9rem",
              color: "#113c91",
            },
          }}
        />
      </BorderedContainer>
      <Container>
        <Box sx={{ width: "100%" }} className="estimation-detail-box">
          <Button variant="outlined" className="estimation-detail-button">
            {" "}
            <SaveOutlined /> Save
          </Button>
        </Box>
      </Container>
      <BorderedContainer>
        <MaterialTable
          style={{ boxShadow: "none" }}
          title="Summary"
          columns={[
            {
              title: "Requirement",
              field: "Requirement",
              editable: false,
            },
            { title: "Description", field: "Description", editable: false },
            {
              title: "UI(Days)",
              field: "UI",
              type: "numeric",
            },
            {
              title: "Frontend(Days)",
              field: "Frontend",
              type: "numeric",
            },
            {
              title: "Backend(Days)",
              field: "Backend",
              type: "numeric",
            },
          ]}
          data={[
            {
              Requirement: "Clients",
              Description: "POC",
              UI: 12,
              Frontend: 63,
              Backend: 63,
            },
            {
              Requirement: "Projects",
              Description: "POC",
              UI: 12,
              Frontend: 63,
              Backend: 63,
            },
          ]}
          editable={{
            onBulkUpdate: (changes) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),
          }}
          options={{
            search: false,
            headerStyle: {
              backgroundColor: "#e5ebf7",
              fontWeight: "bold",
              fontSize: "0.9rem",
              color: "#113c91",
            },
          }}
        />
      </BorderedContainer>
    </React.Fragment>
  );
};

export default EstimationDetail;
