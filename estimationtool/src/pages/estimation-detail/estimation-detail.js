import { Button, Container, Box, Grid } from "@material-ui/core";

import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { EditOutlined, Add } from "@material-ui/icons";
import "./estimation-detail.css";
import { useLocation, Link, useHistory } from "react-router-dom";
import EstimationService from "./EstimationService";
import AddRequirements from "./AddRequirementsPopup";
import useLoader from "../../shared/layout/hooks/useLoader";
import { EstimationHeader, ClientProjectHeader } from "./header-element";
import ResourceCountMatrix from "../ResourceCount/ResourceCount";
import RequirementService from "../CreateRequirements/RequirementService";
import { setResourceMixData } from "../../Redux/resourcemixRedux";

import { RequirementTablePopup } from "../CreateRequirements/RequirementTable";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Deletedailog from "./delete-dailog";
import { useTableStyle } from "../../shared/ui-view/table/TableStyle";
import { useSelector, useDispatch } from "react-redux";
import { setEstHeaderId } from "../../Redux/estimationHeaderId";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineDocumentScanner, MdOutlineTimeline } from "react-icons/md";

import { BiExport, BiImport } from "react-icons/bi";
import { ExportEstimationPopup } from "./Export/ExportEstimation";

import Snackbar from "../../shared/layout/snackbar/Snackbar";
import usePermission from "../../shared/layout/hooks/usePermissions";

const EstimationDetail = () => {
  const classes = useTableStyle();
  const history = useHistory();
  const location = useLocation();
  const estimationHeaderId = useSelector((state) => state.estimationHeaderId);
  const dispatch = useDispatch();
  const {
    estimation_generate_timeline,
    estimation_generate_resourcemix,
    estimationAttributeData,
    estimation_calc_attribute_data,
    estimationConfiguation,
    estimation_export_excel,
    estimation_requirement_add,
  } = usePermission();
  const [isOpen, setOpen] = React.useState({});
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
  const [isRequirementValid, setIsRequirementValid] = useState({
    isValid: true,
  });

  const [openExport, setOpenExport] = useState(false);

  const handleEditRowsModelChange = React.useCallback((model) => {
    setEditRowsModel(model);
  }, []);

  const handleEditManualCallAttChange = React.useCallback((model) => {
    setEditManualCallAtt(model);
  }, []);

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
    getRequirementWithQuery(() => {
      openAddAvailableRequirementFun();
    });
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
      getRequirementDataById();
      getRequirementWithQuery(() => {});
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
        });
    } else {
      callBack();
    }
  };
  const getBasicDetailById = (calback) => {
    setLoader(true);
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
        setSelectedDelete(id.row);
        var msg = (
          <center>
            <p>
              Do you want to remove this requirement from estimation?
              <br />
              <em>
                Note: You can import this requirement again from project
                requirements
              </em>
            </p>
          </center>
        );
        setDeleteMSG(msg);
        setIsOpenDailog(true);
      });
    },
    []
  );

  const closeDeletePopup = () => {
    setIsOpenDailog(false);
  };

  const openEditRequirement = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setEditData([id.row]);
        openFun();
      });
    },
    []
  );

  const getRequirementDataById = () => {
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
            headerName: "Req. Id",
            field: "req_id",
            flex: 1,
            minWidth: 80,
          },
          {
            headerName: "Requirement",
            field: "Requirement",
            flex: 1,
            minWidth: 170,
          },
          {
            headerName: "Tag",
            field: "Tag",
            flex: 1,
            minWidth: 170,
          },
          {
            headerName: "Description",
            field: "Description",
            flex: 1,
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

        setIsRequirementValid(dataResponse.isReqValid);

        setLoader(false);
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
      });
  };

  const updateManualCallAttributeValue = async () => {
    var id = "";
    var body = [];

    for (const [key, value] of Object.entries(editManualCallAtt)) {
      id = key;
      body.push({ _id: key, value: value.Effort.value });
    }

    EstimationService.updateManualCallAttribute(id, body)
      .then((res) => {
        setLoader(false);
        getRequirementDataById();
      })
      .catch((err) => {
        setLoader(false);
        console.log("get deleteRequirement by id error", err);
        getRequirementDataById();
      });
  };
  function roundToTwo(value) {
    return Number(Number(value).toFixed(2));
  }

  const updateAttributeValue = async () => {
    setLoader(true);
    var editedValueArray = [];
    for (const [key, value] of Object.entries(editRowsModel)) {
      for (const [key1, value1] of Object.entries(value)) {
        var estRequirementData = {
          ESTAttributeID: key1,
          ESTHeaderRequirementID: key,
          ESTHeaderID: headerData._id,
          ESTData: roundToTwo(value1.value),
        };
        editedValueArray.push(estRequirementData);
      }
    }
    if (editedValueArray.length !== 0) {
      setLoader(true);
      EstimationService.updateEstRequirementData(editedValueArray)
        .then((res) => {
          setLoader(false);

          getRequirementDataById();
        })
        .catch((error) => {
          setLoader(false);
          console.log("get deleteRequirement by id error", error);
          getRequirementDataById();
        });
    } else {
      setLoader(false);
    }
  };

  const deleteRow = async (row) => {
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
          getRequirementDataById();
        })
        .catch((catchError) => {
          setLoader(false);
          console.log("get deleteRequirement by id error", catchError);
          getRequirementDataById();
        });
    } else {
      setLoader(false);
    }
  };

  ///============== JS- Resource Count Pop up and table - END ==============///

  ///============== JS- Export Estimation Pop up - START ==============///
  const openExportEstimation = () => {
    setOpenExport(true);
  };

  const closeExportEstimation = () => {
    setOpenExport(false);
  };

  ///============== JS- Export Estimation Pop up - END ==============///

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

  const printErr = () => {
    return isRequirementValid.err
      ? isRequirementValid.err.map((el, i) => (
          <span>
            {el}
            {i + 1 !== isRequirementValid.err.length && `, `}
          </span>
        ))
      : "";
  };

  const releaseEstimation = (id) => {
    EstimationService.estimationPublish(id)
      .then((res) => {
        setOpen({
          open: true,
          severity: "success",
          message: res.data.message,
        });
      })
      .catch((err) => {
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  const handleClose = () => {
    setOpen({});
  };

  const exportFun = () => {};

  // Destructing of snackbar
  const { message, severity, open } = isOpen || {};

  return (
    <div className="estimation-detail-cover">
      {/*========= JSX- Export Estimation in Report - START ========= */}
      <ExportEstimationPopup
        openExport={openExport}
        openExportEstimation={openExportEstimation}
        closeExportEstimation={closeExportEstimation}
        title="Export Estimation"
        oktitle="Generate"
        cancelTitle="Cancel"
        exportFun={exportFun}
      />
      {/*========= JSX- Export Estimation in Report - END ========= */}
      {/* ----------------- */}
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
          isDeleteAction={false}
          selection={false}
          requirementTypeArray={requirementTypeArray}
          handleCheckBoxClicked={handleCheckBoxClicked}
        />
      ) : null}

      <Container>
        <Grid container>
          <Grid item className="multi-button-grid">
            {estimation_export_excel && (
              <Button variant="outlined" onClick={openExportEstimation}>
                <BiExport style={{ fontSize: "18px" }} />
                &nbsp;Export in Excel
              </Button>
            )}
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
              {estimationConfiguation && (
                <Button variant="outlined" className="estimation-detail-button">
                  <EditOutlined style={{ fontSize: "18px" }} />
                  &nbsp;Edit Configuration
                </Button>
              )}
            </Link>
          </Grid>
        </Grid>
      </Container>
      <ClientProjectHeader client={clientDetails} project={projectDetails} />
      <EstimationHeader data={headerData} />
      <Container>
        <Grid container>
          <Grid item class="multi-button-grid">
            <Link
              to={{
                pathname:
                  "/All-Clients/" +
                  clientDetails.clientName +
                  "/" +
                  projectDetails.projectName +
                  "/ImportExcelRequirements",
                state: {
                  clientInfo: clientDetails,
                  projectInfo: projectDetails,
                  estimationHeaderId: headerData,
                },
              }}
            >
              <Button style={{ marginRight: "15px" }} variant="outlined">
                <BiImport style={{ fontSize: "20px" }} />
                &nbsp; Import Requirements
              </Button>
            </Link>
            {estimation_requirement_add && (
              <Button
                variant="outlined"
                className="estimation-detail-button"
                onClick={openAddAvailableRequirement}
              >
                {" "}
                <Add style={{ fontSize: "18px" }} />
                &nbsp;Include Project Requirements
              </Button>
            )}
            {estimation_requirement_add && (
              <Button
                variant="outlined"
                className="estimation-detail-button"
                onClick={openAddRequirement}
              >
                {" "}
                <Add style={{ fontSize: "18px" }} />
                &nbsp;Create New Requirements
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>
      <BorderedContainer>
        {loaderComponent ? (
          loaderComponent
        ) : (
          <div>
            <div className="addReqTableHeader">
              <h3>Estimation (in {headerData.effortUnit}s)</h3>
              {!isRequirementValid.isValid && (
                <div className="warningDiv">
                  <IoWarningOutline
                    className="generalWarning"
                    style={{ fontSize: "12px" }}
                  />{" "}
                  <p className="generalWarning">
                    WARNING: Please include{" "}
                    <span className="generalWarning_item">{printErr()}</span> in
                    below requirements, since estimation type is{" "}
                    <b>{headerData.estTypeId.estType}</b>
                  </p>
                </div>
              )}
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
                isCellEditable={() => estimationAttributeData}
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
                params.row.tag === "Grand Total" && "darkbg"
              }
              getCellClassName={(params) => {
                return (
                  (params.colDef.field === "total" && "darkbg") ||
                  (params.colDef.field === "total_Contingency" && "darkbg")
                );
              }}
              isCellEditable={() => estimation_calc_attribute_data}
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
              disableColumnMenu
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
              getRowClassName={(params) =>
                params.row.calculative === "Estimation Total" && "darkbg"
              }
            />
          )}
        </div>
      </BorderedContainer>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item style={{ marginRight: "10px" }}>
          <div class="tooltip">
            {estimation_generate_resourcemix && (
              <Button
                disabled={countError}
                variant="outlined"
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
                <MdOutlineDocumentScanner style={{ fontSize: "18px" }} />
                &nbsp;Generate Resource Mix
              </Button>
            )}
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
        </Grid>
        <Grid item style={{ marginRight: "10px" }}>
          <div class="tooltip">
            {estimation_generate_timeline && (
              <Button
                disabled={countError}
                variant="outlined"
                onClick={() =>
                  history.push({
                    pathname:
                      "/All-Clients/" +
                      clientDetails.clientName +
                      "/" +
                      projectDetails.projectName +
                      "/Estimation-Detail" +
                      "/TimelinePlanning",
                    state: {
                      clientInfo: clientDetails,
                      projectInfo: projectDetails,
                      estimationHeaderId: estimationId,
                      headerData: headerData,
                    },
                  })
                }
              >
                <MdOutlineTimeline style={{ fontSize: "18px" }} />
                &nbsp;Generate Timeline Plan
              </Button>
            )}
            {countError ? (
              <span class="tooltiptext">
                <div className="icon-cover">
                  <IoWarningOutline className="icon-warning" />
                </div>
                Please assign proper role allocation for attributes in resource
                count table to Genrate Timeline Plan
              </span>
            ) : (
              ""
            )}
          </div>
        </Grid>
        <Grid item style={{ marginRight: "10px" }}>
          <Button
            variant="outlined"
            onClick={() => {
              releaseEstimation(estimationId);
            }}
          >
            &nbsp;Estimation Release
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        isOpen={open}
        severity={severity}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
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
