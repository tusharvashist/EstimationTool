import { Button, Container } from "@material-ui/core";
import { Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { EditOutlined, Add, SaveOutlined, Edit } from "@material-ui/icons";
import MaterialTable from "material-table";
import "./EstimationDetail.css";

import { useParams, useLocation } from "react-router-dom";
import EstimationService from "./estimation.service";
import EditConfiguration from "./EditConfigurationDialog";
import AddRequirements from "./AddRequirements";
import { display } from "@material-ui/system";

const EstimationDetail = () => {
  const location = useLocation();
  //console.log(location);

  const params = useParams();
  const estimationId = location.state.estId;
  //console.log(location.state.estId);

  const [clientDetails, setClientDetails] = useState({
    clientName: "",
    description: "",
    website: "",
  });
  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    projectDescription: "",
    businessDomain: "",
  });
  const [headerData, setHeaderData] = useState({
    estName: "",
    estDescription: "",
    effortUnit: "",
    totalCost: 0,
    estTypeId: {},
  });

  const [summaryHeaderArray, setSummaryHeaderArray] = useState([
    [
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
    ],
  ]);
  const [summaryDataArray, setSummaryDataArray] = useState([
    {
      Requirement: "Clients",
      Description: "POC",
      UI: 12,
      Frontend: 63,
      Backend: 63,
    },
  ]);

  const [requirmentHeaderArray, setRequirmentArray] = useState([
    {
      title: "Requirement",
      field: "Requirement",
      editable: false,
    },
    {
      title: "Description",
      field: "Description",
      editable: false,
    },
    {
      title: "UI(Days)",
      field: "UI",
      id: 1,
      type: "numeric",
    },
  ]);
  const [requirmentDataArray, setRequirementDataArray] = useState([]);

  const [openEditConfigurationBox, setOpenEditConfigurationBox] =
    useState(false);
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);

  useEffect(() => {
    console.log("estimationId", estimationId);
    getById();
  }, [estimationId]);

  const openEditConfigConfig = () => {
    openFun();
  };

  const openFun = () => {
    setOpenEditConfigurationBox(true);
  };
  const closeFun = () => {
    setOpenEditConfigurationBox(false);
  };
  const saveEditConfigFun = () => {};

  const openAddRequirement = () => {
    openAddFun();
  };

  const openAddFun = () => {
    setOpenAddRequirementsBox(true);
  };
  const closeAddFun = () => {
    setOpenAddRequirementsBox(false);
  };
  const saveAddRequirementsgFun = () => {};

  const getById = () => {
    EstimationService.getById(estimationId)
      .then((res) => {
        let dataResponse = res.data.body;
        //console.log("dataResponse: ", dataResponse);

        setHeaderData({ ...dataResponse.basicDetails });
        setProjectDetails({ ...dataResponse.basicDetails.projectId });
        setClientDetails({ ...dataResponse.basicDetails.projectId.client });
        var arrayRequirent = [];
        dataResponse.featureList.forEach((item, i) => {
          var requirment = {
            Requirement: item.requirement.requirement,
            Description: item.requirement.description,
            _id: item.requirement._id,
          };

          arrayRequirent.push(requirment);
        });

        var requirment = {
          Requirement: "Total",
          Description: "",
          _id: -1,
        };

        arrayRequirent.push(requirment);
        console.log("arrayRequirent", arrayRequirent);
        setRequirementDataArray(arrayRequirent);
      })
      .catch((err) => {
        console.log("get Client by id error", err);
      });
  };
  console.log(headerData);

  return (
    <React.Fragment>
      {openEditConfigurationBox ? (
        <EditConfiguration
          isOpen={openEditConfigurationBox}
          openF={openFun}
          closeF={closeFun}
          title="Add Cal Attribute"
          oktitle="Save"
          saveFun={saveEditConfigFun}
          cancelTitle="Cancel"
        />
      ) : null}
      {openAddRequirementsBox ? (
        <AddRequirements
          isOpen={openAddRequirementsBox}
          openF={openAddFun}
          closeF={closeAddFun}
          title="Add Cal Attribute"
          oktitle="Save"
          saveFun={saveAddRequirementsgFun}
          cancelTitle="Cancel"
        />
      ) : null}
      <Container>
        <Box sx={{ width: "100%" }} className="estimation-detail-box">
          <Button
            variant="outlined"
            className="estimation-detail-button"
            onClick={openEditConfigConfig}
          >
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
              {headerData.estName}
            </p>
          </Grid>
          <Grid item xs={10} sm={6}>
            <p>
              {" "}
              <span className="title-stl"> Estimation Type :</span>{" "}
              {/* {headerData.estTypeId.estType} */}
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
              {headerData.effortUnit}
            </p>
          </Grid>
          <Grid item xs={10} sm={6}>
            <p>
              <span className="title-stl"> Total Cost :</span> ${" "}
              {headerData.totalCost}{" "}
            </p>
          </Grid>
        </Grid>
      </BorderedContainer>
      <BorderedContainer>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={10} sm={4}>
            <p>
              {" "}
              <span className="title-stl"> Client Name :</span>{" "}
              {clientDetails.clientName}
            </p>
          </Grid>
          <Grid item xs={10} sm={6}>
            <p>
              {" "}
              <span className="title-stl"> Client Website :</span>{" "}
              <a href="#"> {clientDetails.website}</a>
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
              {projectDetails.projectName}
            </p>
          </Grid>
          <Grid item xs={10} sm={6}>
            <p>
              <span className="title-stl"> Business Domain :</span>{" "}
              {projectDetails.domain}{" "}
            </p>
          </Grid>
        </Grid>
      </BorderedContainer>
      <Container>
        <Box sx={{ width: "100%" }} className="estimation-detail-box">
          <Button
            variant="outlined"
            className="estimation-detail-button"
            onClick={openAddRequirement}
          >
            {" "}
            <Add /> Add Requirements
          </Button>
        </Box>
      </Container>
      <BorderedContainer>
        <MaterialTable
          style={{ boxShadow: "none" }}
          title="Estimation Efforts"
          columns={requirmentHeaderArray}
          data={requirmentDataArray}
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
          columns={summaryHeaderArray}
          data={summaryDataArray}
          // editable={{
          //   onBulkUpdate: (changes) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         resolve();
          //       }, 1000);
          //     }),
          //   onRowDelete: (oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         resolve();
          //       }, 1000);
          //     }),
          // }}
          options={{
            search: false,
            paging: false,
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
