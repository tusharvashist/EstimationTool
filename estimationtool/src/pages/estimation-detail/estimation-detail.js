import { Button, Container } from "@material-ui/core";
import { Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { EditOutlined, Add } from "@material-ui/icons";
import MaterialTable from "material-table";
import "./estimation-detail.css";
import { useLocation, Link } from "react-router-dom";
import EstimationService from "./estimation.service";
import AddRequirements from "./add-requirements-popup";
import useLoader from "../../shared/layout/hooks/useLoader";
import { EstimationHeader, ClientProjectHeader } from "./header-element";
import RoleCount from "../resourcemix/RoleCount";
import ResourceCountMatrix from "../resourcemix/ResourceCount";
import RequirementService from "../CreateRequirements/requirement.service";
import requirementFooter from "./requirementFooter";

import { RequirementTablePopup } from "../CreateRequirements/RequirementTable";
import { DataGrid } from "@mui/x-data-grid";

import { makeStyles, createStyles } from "@mui/styles";

const EstimationDetail = () => {
  const location = useLocation();
  const estimationId = location.state.estId;
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
  const [openRequirementTable, setOpenRequirementTable] = useState(false);
  const [editData, setEditData] = useState([]);
  const [summaryHeaderArray, setSummaryHeaderArray] = useState([
    { title: "Title", field: "Title", editable: false },
    { title: "Effort", field: "Effort", editable: false },
  ]);
  const [summaryDataArray, setSummaryDataArray] = useState([]);
  const [requirementHeaderArray, setRequirementHeaderArray] = useState([
    {
      headerName: "Requirement",
      field: "Requirement",
      editable: false,
      width: 170,
    },
    {
      headerName: "Tag",
      field: "Tag",
      editable: false,
      width: 170,
    },
    {
      headerName: "Description",
      field: "Description",
      editable: false,
      width: 170,
    },
  ]);
  const [loaderComponent, setLoader] = useLoader();
  const [requirementHeaderData, setRequirementHeaderData] = useState([]);
  const [editRowsModel, setEditRowsModel] = React.useState({});

  const handleEditRowsModelChange = React.useCallback((model) => {
    setEditRowsModel(model);
  }, []);

  useEffect(() => {
    getById();
  }, [estimationId]);

  const openEditRequirement = (event, rowData) => {
    console.log(rowData);
    const updatedRows = [requirementDataArray[rowData.tableData.id]];
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

  const openAddAvailableRequirement = () => {
    // if (requirementHeaderData.length !== 0) {

    // openAddAvailableRequirementFun();
    // } else {
    getRequirementWithQuery(() => {
      openAddAvailableRequirementFun();
    });
    // }
  };

  const closeAddAvailableRequirement = () => {
    closeAddAvailableRequirementFun();
  };

  const openAddAvailableRequirementFun = () => {
    setOpenRequirementTable(true);
  };

  const closeAddAvailableRequirementFun = () => {
    setOpenRequirementTable(false);
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
    getBasicDetailById(() => {
      getRequirementDataById(() => {
        getRequirementWithQuery(() => {});
      });
    });
  };

  console.log("projectDetails._id", projectDetails._id);

  const getRequirementWithQuery = (callBack) => {
    if (projectDetails._id.length !== 0) {
      RequirementService.getUnpairedRequirementEstimation(
        projectDetails._id,
        headerData._id
      )
        .then((res) => {
          setRequirementHeaderData([...res.data.body.featureList]);

          callBack();
        })
        .catch((err) => {
          console.log("get EstimationService by id error", err);
          //callBack();
        });
    } else {
      callBack();
    }
  };

  const getBasicDetailById = (calback) => {
    setLoader(true);
    console.log("Request for getById: ");
    EstimationService.getById(estimationId)
      .then((res) => {
        setHeaderData({ ...res.data.body.basicDetails });
        setProjectDetails({ ...res.data.body.basicDetails.projectId });
        setClientDetails({ ...res.data.body.basicDetails.projectId.client });
        setRequirementTagArray([...res.data.body.requirementTag]);
        setRequirementTypeArray([...res.data.body.requirementType]);
        setLoader(false);
        calback();
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
      });
  };

  const getRequirementDataById = (callback) => {
    EstimationService.getRequirementDataById(estimationId)
      .then((res) => {
        let dataResponse = res.data.body;
        setSummaryDataArray([...dataResponse.summaryTagList]);
        var estHeaderAttribute = [
          {
            headerName: "Requirement",
            field: "Requirement",
            //id: 1,
            //editable: false,
            width: 170,
          },
          {
            headerName: "Tag",
            field: "Tag",
            //editable: false,
            // id: 2,
            width: 170,
          },
          {
            headerName: "Description",
            field: "Description",
            //editable: false,
            //id: 3,
            width: 170,
          },
        ];
        estHeaderAttribute.push(...dataResponse.estHeaderAttribute);
        setRequirementHeaderArray(estHeaderAttribute);
        setRequirementDataArray(dataResponse.requirementList);
        setLoader(false);
        callback();
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
        callback();
      });
  };

  const updateAttributeValue = async (changes) => {
    var rows = Object.values(changes);
    const updatedRows = [...requirementDataArray];
    let index;
    var updateEstRequirementData = [];
    var requirementHeaderRow = Object.values(requirementHeaderArray);
    rows.map((row) => {
      index = row.oldData.tableData.id;
      updatedRows[index] = row.newData;
      for (let i = 3; i < requirementHeaderRow.length; i++) {
        var requirementData = {
          ESTAttributeID: requirementHeaderRow[i].id,
          ESTHeaderRequirementID: row.newData._id,
          ESTData: row.newData[requirementHeaderRow[i].field],
          ESTHeaderID: headerData._id,
        };
        updateEstRequirementData.push(requirementData);
      }
    });

    setRequirementDataArray(updatedRows);

    if (updateEstRequirementData.length !== 0) {
      setLoader(true);
      EstimationService.updateEstRequirementData(updateEstRequirementData)
        .then((res) => {
          setLoader(false);

          getRequirementDataById(() => {});
        })
        .catch((err) => {
          setLoader(false);
          console.log("get deleteRequirement by id error", err);
          getRequirementDataById(() => {});
        });
    } else {
      setLoader(false);
    }
  };

  const deleteRow = async (changes, resolve) => {
    resolve();
    setLoader(true);
    EstimationService.deleteRequirement(changes._id)
      .then((res) => {
        setLoader(false);
        getById();
      })
      .catch((err) => {
        console.log("get deleteRequirement by id error", err);
        getById();
      });
  };

  ///============== JS- Resource Count Pop up and table - START ==============///

  const popupCount = () => {};

  const columns = [
    { title: "Count", field: "count", width: "1%" },
    {
      title: "Skills(Effort & summary Attribute)",
      field: "skill",
      width: "40%",
    },
    { title: "Technologies", field: "technology", width: "20%" },
    {
      title: "Role",
      field: "role",
      width: "50%",
      render: (rowData) => <RoleCount className="roleCountInput" />,
    },
  ];

  const rowData = [
    {
      count: 2,
      skill: "Frontend",
      technology: "React/Angular",
      // role: "1 Lead, 1 Sr. Developer, 1 Jr Developer",
    },
    {
      count: 2,
      skill: "Frontend",
      technology: "React/Angular",
      // role: "1 Lead, 1 Sr. Developer, 1 Jr Developer",
    },
    {
      count: 2,
      skill: "Frontend",
      technology: "React/Angular",
      // role: "1 Lead, 1 Sr. Developer, 1 Jr Developer",
    },
  ];

  var selectedRequirementsRows = [];
  const handleCheckBoxClicked = (rows) => {
    console.log("rows:-- ", rows);
    selectedRequirementsRows = rows;
  };

  const saveAddAvailableRequirementFun = () => {
    setOpenRequirementTable(false);
    if (selectedRequirementsRows.length !== 0) {
      setLoader(true);
      EstimationService.mapHeaderToMultipleRequirement(
        estimationId,
        selectedRequirementsRows
      )
        .then((res) => {
          setLoader(false);
          getRequirementDataById(() => {});
        })
        .catch((err) => {
          setLoader(false);
          console.log("get deleteRequirement by id error", err);
          getRequirementDataById(() => {});
        });
    } else {
      setLoader(false);
    }
  };

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        "& .MuiDataGrid-columnHeaderWrapper": {
          backgroundColor: "rgb(229, 235, 247)",
        },
      },
    })
  );
  const classes = useStyles();

  // var headerS = [
  //         {
  //           headerName: "Requirement",
  //           field: "Requirement",
  //           //id: 1,
  //           //editable: false,
  //           width: 170
  //         },
  //         {
  //           headerName: "Tag",
  //           field: "Tag",
  //           //editable: false,
  //          // id: 2,
  //           width: 170
  //         },
  //         {
  //           headerName: "Description",
  //           field: "Description",
  //           //editable: false,
  //           //id: 3,
  //           width: 170
  //         },
  //       ];

  const rows = [
    {
      id: 1,
      Requirement: "Requirement",
      Tag: "Tag",
      Description: "Description",
    },
    {
      id: 2,
      Requirement: "Requirement",
      Tag: "Tag",
      Description: "Description",
    },
  ];
  ///============== JS- Resource Count Pop up and table - END ==============///

  return (
    <div className="estimation-detail-cover">
      {/*========= JSX- Resource Count Pop up and table - START ========= */}
      <ResourceCountMatrix data={estimationId} />
      {/* ///========= JSX- Resource Count Pop up and table - END =========/// */}
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

      {openRequirementTable ? (
        <RequirementTablePopup
          isOpen={openRequirementTable}
          openF={openAddAvailableRequirement}
          closeF={closeAddAvailableRequirementFun}
          title="Add Available Requirement"
          oktitle="Add"
          saveFun={saveAddAvailableRequirementFun}
          cancelTitle="Cancel"
          requirementHeaderData={requirementHeaderData}
          selection={false}
          requirementTypeArray={requirementTypeArray}
          handleCheckBoxClicked={handleCheckBoxClicked}
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
      <ClientProjectHeader client={clientDetails} project={projectDetails} />
      <EstimationHeader data={headerData} />
      <Container>
        <Box sx={{ width: "100%" }} className="estimation-detail-box">
          <Button
            variant="outlined"
            className="estimation-detail-button"
            onClick={openAddAvailableRequirement}
          >
            {" "}
            <Add /> Add Available Requirements
          </Button>
          <Box sx={{ width: "20px" }} className="estimation-detail-box" />
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
        {loaderComponent ? (
          loaderComponent
        ) : (
          <>
            <h3 className="tableHeader">Requirements</h3>
            <div
              style={{
                height: 400,
                width: "100%",
              }}
            >
              <DataGrid
                className={classes.root}
                rows={requirementDataArray}
                columns={requirementHeaderArray}
                editRowsModel={editRowsModel}
                onEditRowsModelChange={handleEditRowsModelChange}
                // components={{
                //   Footer: requirementFooter,
                // }}
                // componentsProps={{
                //   Footer: { className: "tablefooter" },
                // }}
              />
            </div>
          </>
        )}
      </BorderedContainer>
      <Container>
        <Box sx={{ width: "100%" }} className="estimation-detail-box"></Box>
      </Container>
      <BorderedContainer>
        {loaderComponent ? (
          loaderComponent
        ) : (
          <MaterialTable
            style={{ boxShadow: "none" }}
            title={`Summary (${headerData.effortUnit})`}
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
        )}
      </BorderedContainer>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item style={{ marginRight: "10px" }}>
          <Link
            to={{
              pathname:
                "/All-Clients/" +
                clientDetails.clientName +
                "/" +
                projectDetails.projectName +
                "/" +
                headerData.estName +
                "/requirement-mix",
              state: {
                clientInfo: clientDetails,
                projectInfo: projectDetails,
                estimationHeaderId: estimationId,
              },
            }}
          >
            <Button variant="outlined" className="estimation-detail-button">
              {" "}
              <EditOutlined /> Generate Resource Mix
            </Button>
          </Link>
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default EstimationDetail;
