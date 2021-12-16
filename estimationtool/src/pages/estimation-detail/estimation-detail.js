import { Button, Container } from "@material-ui/core";
import { Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { EditOutlined, Add } from "@material-ui/icons";
import MaterialTable from "material-table";
import "./estimation-detail.css";
import { useLocation, Link, useHistory } from "react-router-dom";
import EstimationService from "./estimation.service";
import AddRequirements from "./add-requirements-popup";
import useLoader from "../../shared/layout/hooks/useLoader";
import { EstimationHeader, ClientProjectHeader } from "./header-element";
import RoleCount from "../ResourceCount/RoleCount";
import ResourceCountMatrix from "../ResourceCount/ResourceCount";
import RequirementService from "../CreateRequirements/requirement.service";
import { setResourceMixData } from "../../Redux/resourcemixRedux";

import { RequirementTablePopup } from "../CreateRequirements/RequirementTable";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Deletedailog from "./delete-dailog";
import { useTableStyle } from "../../shared/ui-view/table/TableStyle";
import { useSelector, useDispatch } from "react-redux";
import { setEstHeaderId } from "../../Redux/estimationHeaderId";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { IoWarningOutline } from "react-icons/io5";

const EstimationDetail = () => {
  const classes = useTableStyle();
  const history = useHistory();
  const location = useLocation();
  const estimationHeaderId = useSelector((state) => state.estimationHeaderId);
  const dispatch = useDispatch();
  console.log("location", location);
  let estimationId;
  if (location.state !== undefined) {
    estimationId = location.state.estId;
    dispatch(setEstHeaderId(location.state.estId));
  } else {
    estimationId = estimationHeaderId.estHeaderId;
  }

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
  const [loaderComponent, setLoader] = useLoader();
  const [isOpenDailog, setIsOpenDailog] = useState(false);
  const [deleteMSG, setDeleteMSG] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState({});
  const [requirementHeaderData, setRequirementHeaderData] = useState([]);
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [editManualCallAtt, setEditManualCallAtt] = React.useState({});
  const [summaryHeaderArray, setSummaryHeaderArray] = useState([]);
  const [summaryDataArray, setSummaryDataArray] = useState([]);

  const [tagHeaderArray, setTagHeaderArray] = useState([]);
  const [tagDataArray, setTagDataArray] = useState([]);
  const [requirementHeaderArray, setRequirementHeaderArray] = useState([]);
  const [countError, setCountError] = useState(false);

  const handleEditRowsModelChange = React.useCallback((model) => {
    setEditRowsModel(model);
  }, []);

  const handleEditManualCallAttChange = React.useCallback((model) => {
    setEditManualCallAtt(model);
  }, []);

  // console.log("editRowsModel: ",editRowsModel);

  useEffect(() => {
    getById();
  }, [estimationId]);

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
  console.log("HeaderData: ", headerData);
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
        if (location.state !== undefined) {
          let obj = {
            client: res.data.body.basicDetails.projectId.client,
            project: res.data.body.basicDetails.projectId,
            estHeadId: estimationId,
            data: res.data.body.basicDetails,
          };
          dispatch(setResourceMixData(obj));
        }
        calback();
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
      });
  };
  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        console.log(id);
        setSelectedDelete(id.row);
        var msg = (
          <center>
            <p>
              Do you want to remove this requirement from estimation?
              <br />
              <em>
                Note: You can import this requiremnet agin from project
                requirements
              </em>
            </p>
          </center>
        );
        setDeleteMSG(msg);
        setIsOpenDailog(true);
        // var seletedRow = requirementDataArray.filter((data) => data.action === id);
        //console.log(seletedRow);

        // setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );

  const closeDeletePopup = () => {
    setIsOpenDailog(false);
  };
  // const openEditRequirement = ( rowData) => {
  //    console.log(rowData);
  //     //const updatedRows = [requirementDataArray[rowData.tableData.id]];
  //    //setEditData([rowData]);
  //     openFun();
  //   };

  const openEditRequirement = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        console.log(id);
        setEditData([id.row]);
        openFun();
      });
    },
    []
  );

  const getRequirementDataById = (callback) => {
    EstimationService.getRequirementDataById(estimationId)
      .then((res) => {
        let dataResponse = res.data.body;

        var estHeaderAttribute = [
          {
            field: "action",
            type: "actions",
            headerName: "Actions",
            minWidth: 80,
            getActions: (params) => [
              <>
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={deleteUser(params)}
                />
                <Box sx={{ width: "20px" }} className="estimation-detail-box" />
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Delete"
                  onClick={openEditRequirement(params)}
                />
              </>,
            ],
          },
          {
            headerName: "Requirement",
            field: "Requirement",
            //id: 1,
            //editable: false,
            flex: 1,
            minWidth: 170,
          },
          {
            headerName: "Tag",
            field: "Tag",
            flex: 1,
            //editable: false,
            // id: 2,
            minWidth: 170,
          },
          {
            headerName: "Description",
            field: "Description",
            flex: 1,
            //editable: false,
            //id: 3,
            minWidth: 170,
          },
        ];
        estHeaderAttribute.push(...dataResponse.estHeaderAttribute);
        setRequirementHeaderArray(estHeaderAttribute);
        setRequirementDataArray(dataResponse.requirementList);
        setTagHeaderArray([...dataResponse.tagSummaryHeader]);
        setTagDataArray([...dataResponse.tagSummaryData]);

        setSummaryHeaderArray([...dataResponse.summaryCallHeader]);
        setSummaryDataArray([...dataResponse.summaryCalData]);

        setLoader(false);
        callback();
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
        callback();
      });
  };

  const updateManualCallAttributeValue = async () => {
    var id = "";
    var body = [];

    for (const [key, value] of Object.entries(editManualCallAtt)) {
      id = key;
      body.push({ _id: key, value: value.Effort.value });

      console.log("Key value: ", id, body);
    }

    EstimationService.updateManualCallAttribute(id, body)
      .then((res) => {
        setLoader(false);
        getRequirementDataById(() => {});
      })
      .catch((err) => {
        setLoader(false);
        console.log("get deleteRequirement by id error", err);
        getRequirementDataById(() => {});
      });
    console.log("updateManualCallAttributeValue End....", editManualCallAtt);
  };
  function roundToTwo(value) {
    return Number(Number(value).toFixed(2));
  }

  const updateAttributeValue = async () => {
    setLoader(true);
    console.log("End....", editRowsModel);
    var editedValueArray = [];
    for (const [key, value] of Object.entries(editRowsModel)) {
      //  console.log(key, value);
      for (const [key1, value1] of Object.entries(value)) {
        var estRequirementData = {
          ESTAttributeID: key1,
          ESTHeaderRequirementID: key,
          ESTHeaderID: headerData._id,
          ESTData: roundToTwo(value1.value),
        };
        console.log(estRequirementData);
        editedValueArray.push(estRequirementData);
      }
    }
    if (editedValueArray.length !== 0) {
      setLoader(true);
      EstimationService.updateEstRequirementData(editedValueArray)
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

  const deleteRow = async (row) => {
    // resolve();
    setIsOpenDailog(false);
    setLoader(true);
    EstimationService.deleteRequirement(row.id)
      .then((res) => {
        setLoader(false);
        getById();
      })
      .catch((err) => {
        console.log("get deleteRequirement by id error", err);
        getById();
      });
  };

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

  // Redux for Resource Mix Screen

  const getResourceMixReduxData = () => {
    console.log(
      "clientDetails,projectDetails,estimationId",
      clientDetails,
      projectDetails,
      estimationId
    );
    const { clientDetails, projectDetails, estimationId } = {};
  };

  ///============== JS- Resource Count Pop up and table - END ==============///

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleCellFocusOut = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleCountError = (flag) => {
    setCountError(flag);
  };

  // css for tooltip

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement="top" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <div className="estimation-detail-cover">
      {/*========= JSX- Resource Count Pop up and table - START ========= */}
      <ResourceCountMatrix
        data={estimationId}
        errorFunction={handleCountError}
        countError={countError}
      />
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
      {isOpenDailog === true ? (
        <Deletedailog
          isOpen={isOpenDailog}
          openF={openFun}
          closeF={closeDeletePopup}
          title="Remove Requirement"
          message={deleteMSG}
          row={selectedDelete}
          okAction={deleteRow}
          oktitle="Ok"
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
            <Add /> Include Project Requirements
          </Button>
          <Box sx={{ width: "20px" }} className="estimation-detail-box" />
          <Button
            variant="outlined"
            className="estimation-detail-button"
            onClick={openAddRequirement}
          >
            {" "}
            <Add /> Create New Requirements
          </Button>
        </Box>
      </Container>
      <BorderedContainer>
        {loaderComponent ? (
          loaderComponent
        ) : (
          <div>
            <div className="addReqTableHeader">
              <h3>Estimation (in {headerData.effortUnit}s)</h3>
            </div>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                className={`${classes.root} ${classes.dataGrid}`}
                onCellFocusOut={handleCellFocusOut}
                rows={requirementDataArray}
                columns={requirementHeaderArray.map((column) => ({
                  ...column,
                  sortable: false,
                }))}
                editRowsModel={editRowsModel}
                sort
                editMode="row"
                onRowEditStart={() => {
                  console.log("Start....", editRowsModel);
                }}
                onRowEditStop={updateAttributeValue}
                onEditRowsModelChange={handleEditRowsModelChange}
                components={{
                  Toolbar: CustomToolbar,
                }}
              />
            </div>
          </div>
        )}
      </BorderedContainer>
      <Container>
        <Box sx={{ width: "100%" }} className="estimation-detail-box"></Box>
      </Container>
      <BorderedContainer>
        <div className="addReqTableHeader">
          <h3>Summary (in {headerData.effortUnit}s)</h3>
        </div>
        <div className="addReqTableHeader">
          <h4>Tags Total</h4>
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          {loaderComponent ? (
            loaderComponent
          ) : (
            <DataGrid
              className={`${classes.root} ${classes.dataGrid}`}
              autoHeight={true}
              disableExtendRowFullWidth={false}
              hideFooter={true}
              className={classes.root}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              onCellFocusOut={handleCellFocusOut}
              rows={tagDataArray}
              columns={tagHeaderArray.map((column) => ({
                ...column,
                sortable: false,
              }))}
              components={{
                Toolbar: CustomToolbar,
              }}
              getRowClassName={(params) =>
                params.row.tag === "Total" && "darkbg"
              }
              getCellClassName={(params) => {
                return (
                  (params.colDef.field === "total" && "darkbg") ||
                  (params.colDef.field === "total_Contingency" && "darkbg")
                );
              }}
            />
          )}
        </div>

        <Box
          sx={{ height: "20px", width: "20px" }}
          className="estimation-detail-box"
        />
        <div className="addReqTableHeader">
          <h4>Calculated Attributes Total</h4>
        </div>
        <div style={{ height: "100%", width: "100%" }}>
          {loaderComponent ? (
            loaderComponent
          ) : (
            <DataGrid
              className={`${classes.root} ${classes.dataGrid}`}
              autoHeight={true}
              hideFooter={true}
              disableExtendRowFullWidth={true}
              className={classes.root}
              onCellFocusOut={handleCellFocusOut}
              rows={summaryDataArray}
              columns={summaryHeaderArray}
              editRowsModel={editManualCallAtt}
              editMode="row"
              onRowEditStart={() => {
                console.log("Start....", editRowsModel);
              }}
              onRowEditStop={updateManualCallAttributeValue}
              onEditRowsModelChange={handleEditManualCallAttChange}
              isCellEditable={(params) => params.row.calcType === "manual"}
              getCellClassName={(params) => {
                return (
                  (params.colDef.field === "Effort" && "darkbg") ||
                  (params.colDef.field === "Contingency" && "darkbg")
                );
              }}
            />
          )}
        </div>
      </BorderedContainer>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item style={{ marginRight: "10px" }}>
          {/* <Link
            disabled
            to={{
              pathname:
                "/All-Clients/" +
                clientDetails.clientName +
                "/" +
                projectDetails.projectName +
                "/Estimation-Detail" +
                "/ResourceMix",
              state: {
                clientInfo: clientDetails,
                projectInfo: projectDetails,
                estimationHeaderId: estimationId,
                headerData: headerData,
              },
            }}
          > */}
          <div class="tooltip">
            <Button
              disabled={countError}
              variant="outlined"
              className="estimation-detail-button"
              onClick={() =>
                history.push({
                  pathname:
                    "/All-Clients/" +
                    clientDetails.clientName +
                    "/" +
                    projectDetails.projectName +
                    "/Estimation-Detail" +
                    "/ResourceMix",
                  state: {
                    clientInfo: clientDetails,
                    projectInfo: projectDetails,
                    estimationHeaderId: estimationId,
                    headerData: headerData,
                  },
                })
              }
            >
              {" "}
              <EditOutlined /> Generate Resource Mix
            </Button>
            {countError ? (
              <span class="tooltiptext">
                <div className="icon-cover">
                  <IoWarningOutline className="icon-warning" />
                </div>
                Please assign proper role allocation for attributes in resource
                count table to Genrate Resource Mix
              </span>
            ) : (
              ""
            )}
          </div>
          {/* </Link> */}
        </Grid>
        <Grid item>
          <Button variant="outlined" className="estimation-detail-button">
            {" "}
            <EditOutlined /> Generate Timeline Plan
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EstimationDetail;

function CustomToolbar(props) {
  return (
    <GridToolbarContainer {...props}>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}