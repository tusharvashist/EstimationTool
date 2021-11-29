import { Button, Container } from "@material-ui/core";
import { Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { EditOutlined, Add, SaveOutlined, Edit } from "@material-ui/icons";
import MaterialTable from "material-table";
import "./EstimationDetail.css";
import { useLocation, Link } from "react-router-dom";
import EstimationService from "./estimation.service";
import AddRequirements from "./AddRequirements";
import useLoader from "../../shared/layout/hooks/useLoader";
import { useHistory } from "react-router-dom";
import counting from "../../assests/team.png";
import { EstimationHeader, ClientProjectHeader } from "./HeaderElement";
import RoleCount from "../../shared/layout/PopTable/RoleCount";
import ResourceCountMatrix from "../resourcemix/ResourceCount"
import RequirementService from "../CreateRequirements/requirement.service";
import { RequirementTable, RequirementTablePopup} from "../CreateRequirements/RequirementTable"

const EstimationDetail = () => {
  const location = useLocation();
  const history = useHistory();
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
  const [openEditConfigurationBox, setOpenEditConfigurationBox] = useState(false);
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const [openRequirementTable, setOpenRequirementTable] = useState(false);
  const [editData, setEditData] = useState([]);
  const [summaryHeaderArray, setSummaryHeaderArray] = useState([
    { title: "Title", field: "Title", editable: false },
    { title: "Effort", field: "Effort", editable: false },
  ]);
  const [summaryDataArray, setSummaryDataArray] = useState([]);
  const [requirementHeaderArray, setRequirementHeaderArray] = useState();
  const [loaderComponent, setLoader] = useLoader();

  const [requirementHeaderData, setRequirementHeaderData] = useState([]);
  
  useEffect(() => {
    getById();
  }, [estimationId]);

  const openEditRequirement = (event, rowData) => {
    console.log(rowData);
    const updatedRows = [requirementDataArray[rowData.tableData.id]];

    
    setEditData(updatedRows);
    console.log(updatedRows + ">>>>>>>>>>>>>>>>>>");
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
    openAddAvailableRequirementFun();
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
      getRequirementDataById(() => { getRequirementWithQuery()});
    });
  };

  console.log("projectDetails._id", projectDetails._id);

   const getRequirementWithQuery = (callBack) => {
    RequirementService.getRequirementWithQuery(projectDetails._id)
      .then((res) => {
        setRequirementHeaderData([ ...res.data.body.featureList ]);
        
        callBack();
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
        //callBack();
      });
   };
  
  
  
  
  const getBasicDetailById = (calback) => {
    //setLoader(true);
    console.log("Request for getById: ");
    EstimationService.getById(estimationId)
      .then((res) => {
        // setLoader(false);
        console.log("Received data Start Setting");

        //let dataResponse = res.data.body;
        console.log("dataResponse = res.data.body");
        setHeaderData({ ...res.data.body.basicDetails });
        console.log("dataResponse.basicDetails");
        setProjectDetails({ ...res.data.body.basicDetails.projectId });
        console.log("dataResponse.basicDetails.projectId");
        setClientDetails({ ...res.data.body.basicDetails.projectId.client });
        console.log("Received data Start End");
        console.log("dataResponse.basicDetails.projectId.client");
        setRequirementTagArray([...res.data.body.requirementTag]);
        console.log("dataResponse.requirementTag");
        setRequirementTypeArray([...res.data.body.requirementType]);
        console.log("dataResponse.requirementType");
        calback();
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
      });
  };

  const getRequirementDataById = (callback) => {
    console.log("Request for getRequirementDataById: ");
    EstimationService.getRequirementDataById(estimationId)
      .then((res) => {
        console.log("Received getRequirementDataById Setting");
        //setLoader(false);
        let dataResponse = res.data.body;
        setSummaryDataArray([...dataResponse.summaryTagList]);
        console.log("dataResponse.summaryTagList");
        var estHeaderAttribute = [
          {
            title: "Requirement",
            field: "Requirement",
            id: 1,
            editable: false,
          },
          {
            title: "Tag",
            field: "Tag",
            editable: false,
            id: 2,
          },
          {
            title: "Description",
            field: "Description",
            editable: false,
            id: 3,
          },
        ];
        console.log("dataResponse.title: Description");
        estHeaderAttribute.push(...dataResponse.estHeaderAttribute);
        setRequirementHeaderArray(estHeaderAttribute);
        console.log(
          " setRequirementHeaderArray(dataResponse.estHeaderAttribute);="
        );
        setRequirementDataArray(dataResponse.requirementList);
        console.log("Received getRequirementDataById End");
        callback();
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history.push(url);
        // }
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

          getRequirementDataById(() => { });
        })
        .catch((err) => {
          setLoader(false);
          console.log("get deleteRequirement by id error", err);
          // if ((err.response.data = 401) || (err.response.data = 404)) {
          //   let url = "/login";
          //   history.push(url);
          // }
           getRequirementDataById(() => { });
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

  const handleCountTable = () => {
    const tableDiv = document.querySelector(".estimation-detail-count-table");
    if (tableDiv.classList.contains("close-resourceCountTable")) {
      tableDiv.classList.remove("close-resourceCountTable");
      tableDiv.classList.add("open");
    } else {
      tableDiv.classList.add("close-resourceCountTable");
      tableDiv.classList.remove("open");
    }
  };

  const handleRowClick = (rowData) => {
    console.log(rowData);
    const roleDiv = document.querySelector(".rolelist");
    roleDiv.classList.toggle("close-role");
  };

  ///============== JS- Resource Count Pop up and table - END ==============///

  return (
    <div className="estimation-detail-cover">
      {/*========= JSX- Resource Count Pop up and table - START ========= */}
      <ResourceCountMatrix data={estimationId}/>
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
          saveFun={closeAddAvailableRequirementFun}
          cancelTitle="Cancel"
          requirementHeaderData={requirementHeaderData}
          selection={false}
          requirementTypeArray={requirementTypeArray} />
  
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
      <EstimationHeader data={headerData} />
      <ClientProjectHeader client={clientDetails} project={projectDetails} />
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
          <MaterialTable
            style={{ boxShadow: "none" }}
            title={`Estimation Efforts (${headerData.effortUnit})`}
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
