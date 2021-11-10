import { Button, Container } from "@material-ui/core";
import { Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { EditOutlined, Add, SaveOutlined, Edit } from "@material-ui/icons";
import MaterialTable from "material-table";
import "./EstimationDetail.css";
import { useParams, useLocation, Link } from "react-router-dom";
import EstimationService from "./estimation.service";
import EditConfiguration from "./EditConfigurationDialog";
import AddRequirements from "./AddRequirements";
import { display } from "@material-ui/system";

const EstimationDetail = () => {
  const location = useLocation();
  console.log(location);
  const estimationId = location.state.estId;
  // const estimationId = localStorage.estimationHeaderId;
  console.log(estimationId);
  const [clientDetails, setClientDetails] = useState({
    _id: "",
    clientName: "",
    description: "",
    website: "",
  });
  const [projectDetails, setProjectDetails] = useState({
    _id: "",
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
  const [requirementDataArray, setRequirementDataArray] = useState([]);
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  const [openEditConfigurationBox, setOpenEditConfigurationBox] =
    useState(false);
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const [editData, setEditData] = useState([]);
  const [summaryHeaderArray, setSummaryHeaderArray] = useState([
      {title: "Title", field: "Title",  editable: false, },
      {title: "Effort", field: "Effort", editable: false },
  ]);

  const [summaryDataArray, setSummaryDataArray] = useState([
    { Title: "Dev",Effort: 12},
  ]);

  const [requirementHeaderArray, setRequirementHeaderArray] = useState([]);
 
  useEffect(() => {
    getById();
  }, [estimationId]);

  const openEditRequirement = (event, rowData) => {
    const updatedRows = [requirementDataArray[rowData.tableData.id]];
    console.log("rowData: ", updatedRows);
    setEditData(updatedRows);
    openFun();
  };

  const openFun = () => {
    setOpenEditConfigurationBox(true);
  };

  const closeFun = () => {
    setOpenEditConfigurationBox(false);
  };

  const saveEditConfigFun = () => {
    closeFun();
    getById();  
  };

  const openAddRequirement = () => {
    openAddFun();
  };

  const openAddFun = () => {
    setOpenAddRequirementsBox(true);
  };

  const closeAddFun = () => {
    setOpenAddRequirementsBox(false);
  };

  const saveAddRequirementsFun = () => {
    closeAddFun();
    getById();
  };

  const getById = () => {
    EstimationService.getById(estimationId)
      .then((res) => {
        let dataResponse = res.data.body;
        setHeaderData({ ...dataResponse.basicDetails });
        setProjectDetails({ ...dataResponse.basicDetails.projectId });
        setClientDetails({ ...dataResponse.basicDetails.projectId.client });
        setRequirementTagArray([...dataResponse.requirementTag]);
        setRequirementTypeArray([...dataResponse.requirementType]);
         setSummaryDataArray([...dataResponse.summaryTagList]);
        var estHeaderAttribute = [
          {
            title: "Requirement",
            field: "Requirement",
            id: 1,
            editable: false,
          },
          { title: "Tag", field: "Tag", editable: false, id: 2 },
          {
            title: "Description",
            field: "Description",
            editable: false,
            id: 3,
          },
        ];
        dataResponse.estHeaderAttribute.forEach((item, i) => {
          estHeaderAttribute.push(item);
        });
        setRequirementHeaderArray(estHeaderAttribute);
        var arrayRequirement = [];
        dataResponse.featureList.forEach((item, i) => {
          if (item.isDeleted === false) {
            var requirement = {
              Requirement: item.requirement.title,
              Description: item.requirement.description,
              Tag: item.requirement.tag.name,
              Tagid: item.requirement.tag._id,
              Type: item.requirement.type,
              requirementId: item.requirement._id,
              _id: item._id,
            };
            item.estRequirementData.forEach((item, i) => {
              requirement[item.ESTAttributeID._id] = item.ESTData;
            });
            arrayRequirement.push(requirement);
          }
        });
        setRequirementDataArray(arrayRequirement);
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
      });
  };

  const updateAttributeValue = async (changes) => {
    var rows = Object.values(changes);
    const updatedRows = [...requirementDataArray];
    let index;
    var updateEstRequirementData = []
     var requirementHeaderRow = Object.values(requirementHeaderArray);
    rows.map(row => {
      index = row.oldData.tableData.id;
      updatedRows[index] = row.newData;
      for (let i = 3; i < requirementHeaderRow.length; i++) {
      var requirementData = {
        ESTAttributeID: requirementHeaderRow[i].id,
        ESTHeaderRequirementID: row.newData._id,
        ESTData: row.newData[requirementHeaderRow[i].field],
        ESTHeaderID:headerData._id
        };
        updateEstRequirementData.push(requirementData);
      }
    });

    setRequirementDataArray(updatedRows);
    EstimationService.updateEstRequirementData(updateEstRequirementData).then((res) => {
         getById(); 
      })
      .catch((err) => {
        console.log("get deleteRequirement by id error", err);
        getById();
      });
  };

  const deleteRow = async (changes,resolve) => {
    resolve();
    EstimationService.deleteRequirement(changes._id).then((res) => {
         getById(); 
      })
      .catch((err) => {
        console.log("get deleteRequirement by id error", err);
        getById();
      });
  };
  return (
    <React.Fragment>
      {/* {openEditConfigurationBox ? (
        <AddRequirements
          isOpen={openEditConfigurationBox}
          openF={openAddFun}
          closeF={closeFun}
          title="Edit Requirement"
          oktitle="Update"
          saveFun={saveEditConfigFun}
          requirementTagArray={requirementTagArray}
          requirementTypeArray={requirementTypeArray}
          project={projectDetails._id}
          estHeader={headerData._id}
          editData={editData}
          cancelTitle="Cancel"
        />
      ) : null} */}
      {openEditConfigurationBox ? (
        <AddRequirements
          isOpen={openEditConfigurationBox}
          openF={openAddFun}
          closeF={closeFun}
          title="Edit Requirement"
          oktitle="Update"
          saveFun={saveEditConfigFun}
          requirementTagArray={requirementTagArray}
          requirementTypeArray={requirementTypeArray}
          project={projectDetails._id}
          estHeader={headerData._id}
          editData={editData}
          cancelTitle="Cancel"
        />
      ) : null}
      {openAddRequirementsBox ? (
        <AddRequirements
          isOpen={openAddRequirementsBox}
          openF={openAddFun}
          closeF={closeAddFun}
          title="Add Requirement"
          oktitle="Save"
          saveFun={saveAddRequirementsFun}
          requirementTagArray={requirementTagArray}
          requirementTypeArray={requirementTypeArray}
          project={projectDetails._id}
          estHeader={headerData._id}
          cancelTitle="Cancel"
        />
      ) : null}
      <Container>
        <Box sx={{ width: "100%" }} className="estimation-detail-box" mt={2}>
          <Link
            to={{
              pathname:
                "/All-Clients/" +
                clientDetails.clientName +
                "/" +
                projectDetails.projectName +
                "/createEstimate",
              state: {
                clientInfo: clientDetails,
                projectInfo: projectDetails,
                estimationHeaderId: estimationId,
              },
            }}
          >
            <Button variant="outlined" className="estimation-detail-button">
              {" "}
              <EditOutlined /> Edit Configuration
            </Button>
          </Link>
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
              {headerData.estTypeId.estType} 
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
          columns={requirementHeaderArray}
          data={requirementDataArray}
          onRowClick={(event, rowData, togglePanel) =>
            openEditRequirement(event, rowData)
          }
          editable={{
            onBulkUpdate: (changes) =>
              new Promise((resolve, reject) => {
                updateAttributeValue(changes);
                setTimeout(() => {
                  resolve();
                }, 1000);
              }),

            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                deleteRow(oldData, resolve);
                // setTimeout(() => {
                //   resolve();
                // }, 1000);
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
        </Box>
      </Container>
      <BorderedContainer>
        <MaterialTable
          style={{ boxShadow: "none" }}
          title="Summary"
          columns={summaryHeaderArray}
          data={summaryDataArray}
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
