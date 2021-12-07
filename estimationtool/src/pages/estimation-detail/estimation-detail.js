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
import { DataGrid,GridActionsCellItem ,  GridToolbarColumnsButton,
  GridToolbarContainer,GridToolbarDensitySelector,GridToolbarExport} from "@mui/x-data-grid";
import { makeStyles, createStyles } from "@mui/styles";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Deletedailog from './delete-dailog';


const EstimationDetail = () => {
  const location = useLocation();
  const estimationId = location.state.estId;
  const [clientDetails, setClientDetails] = useState({_id: "", clientName: "", description: "", website: "",});
  const [projectDetails, setProjectDetails] = useState({_id: "", projectName: "",projectDescription: "",businessDomain: "",});
  const [headerData, setHeaderData] = useState({ estName: "", estDescription: "", effortUnit: "", totalCost: 0, estTypeId: {},});
  const [requirementDataArray, setRequirementDataArray] = useState([]);
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  const [openEditConfigurationBox, setOpenEditConfigurationBox] = useState(false);
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const [openRequirementTable, setOpenRequirementTable] = useState(false);
  const [editData, setEditData] = useState([]);
  const [loaderComponent, setLoader] = useLoader();
  const [isOpenDailog, setIsOpenDailog] = useState(false);
  const [deleteMSG, setDeleteMSG] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState({});
  const [requirementHeaderData, setRequirementHeaderData] = useState([]);
  const [editRowsModel, setEditRowsModel] = React.useState({});
  
  const [summaryHeaderArray, setSummaryHeaderArray] = useState([]);
  const [summaryDataArray, setSummaryDataArray] = useState([]);

  const [tagHeaderArray, setTagHeaderArray] = useState([]);
  const [tagDataArray, setTagDataArray] = useState([]);
  const [requirementHeaderArray, setRequirementHeaderArray] = useState([]);
 

  
  
  const handleEditRowsModelChange = React.useCallback((model) => {
    setEditRowsModel(model);
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
const deleteUser = React.useCallback(
    (id) => () => {
    setTimeout(() => {
      console.log(id);
      setSelectedDelete(id.row);
      var msg = "Are you sure to delete \"" + id.row.Requirement + "\" ?" 
      setDeleteMSG(msg);
      setIsOpenDailog(true);
     // var seletedRow = requirementDataArray.filter((data) => data.action === id);
      //console.log(seletedRow);
      
        // setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [],
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
    [],
  );
  
  const getRequirementDataById = (callback) => {
    EstimationService.getRequirementDataById(estimationId)
      .then((res) => {
        let dataResponse = res.data.body;
       
        var estHeaderAttribute = [
         {
        field: 'action',
        type: 'actions',
        headerName: 'Actions',
        width: 120,
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
                </>
        ],
      },
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
        
        var summaryHeader = [{ headerName: "Tags", field: "Title", editable: false, width: 300 }];
        summaryHeader.push(...dataResponse.estHeaderAttribute);
        summaryHeader.push({ headerName: "Total", field: "Effort", editable: false, width: 200 });
        summaryHeader.push({ headerName: "Total Contingency", field: "EffortContingency", editable: false, width: 200 });

        setTagHeaderArray([...dataResponse.tagSummaryHeader]);
        setTagDataArray([...dataResponse.tagSummaryData]);
        




        var calculativeHeader = [{ headerName: "Calculative", field: "Title", editable: false, width: 300 },
          { headerName: "Total", field: "Effort", editable: false, width: 200 }];
         calculativeHeader.push({ headerName: "Contingency", field: "Contingency", editable: false, width: 200 });

        setSummaryHeaderArray(calculativeHeader);
        setSummaryDataArray([...dataResponse.summaryTagList]);
        




        setLoader(false);
        callback();
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
        callback();
      });
  };

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
                            ESTData: value1.value,
                          }
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
       { isOpenDailog === true ? (
        <Deletedailog
          isOpen={isOpenDailog}
          openF={openFun}
          closeF={closeDeletePopup}
          title="Delete Requirement"
          message={deleteMSG}
          row={ selectedDelete}
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
            <div>
            <div className="addReqTableHeader" >
               <h3>Estimation</h3>
             </div>
            <div style={{ height: 400, width: '100%' }}>
               
           <DataGrid
                className={classes.root}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                onCellFocusOut={handleCellFocusOut}
                rows={requirementDataArray}
                columns={requirementHeaderArray}
                editRowsModel={editRowsModel}
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
        )
        
        }
      </BorderedContainer>
      <Container>
        <Box sx={{ width: "100%" }} className="estimation-detail-box"></Box>
      </Container>
      <BorderedContainer>
        <div className="addReqTableHeader" >
               <h3>Summary</h3>
             </div>
          <div style={{ height: '100%' , width: '100%'}}>
        {loaderComponent ? (
          loaderComponent
        ) : (
              <DataGrid
                autoHeight={true}
                disableExtendRowFullWidth={false}
                hideFooter={true}
                className={classes.root}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                onCellFocusOut={handleCellFocusOut}
                rows={tagDataArray}
                columns={tagHeaderArray}
              />
              
          )}
        </div>
        
          <Box sx={{height:"20px", width: "20px" }} className="estimation-detail-box" />
             <div style={{ height: '100%', width: "100%" }}>
           {loaderComponent ? (
          loaderComponent
        ) : (
              <DataGrid
                autoHeight={true}
                hideFooter={true}
                disableExtendRowFullWidth={true}
                className={classes.root}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                onCellFocusOut={handleCellFocusOut}
                rows={summaryDataArray}
                columns={summaryHeaderArray}
              />
              
        )}
        </div>
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


function CustomToolbar(props) {
  return (
    <GridToolbarContainer {...props}>
      <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}