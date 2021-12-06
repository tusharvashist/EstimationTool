import { Button, Container } from "@material-ui/core";
import { Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { EditOutlined, Add, SaveOutlined, Edit } from "@material-ui/icons";
import MaterialTable from "material-table";
import EstimationService from "../estimation-detail/estimation.service";
import { useLocation, Link } from "react-router-dom";
import useLoader from "../../shared/layout/hooks/useLoader";
import { EstimationHeader, ClientProjectHeader } from "../estimation-detail/header-element";
import ResourceCountMatrix from "../resourcemix/ResourceCount"
import { DataGrid } from '@material-ui/data-grid';

const RequirementMix = () => {
  const location = useLocation();
  const estimationId = location.state.estimationHeaderId;
  const [clientDetails, setClientDetails] = useState({ _id: "",clientName: "",description: "",website: ""});
  const [projectDetails, setProjectDetails] = useState({ _id: "",projectName: "", projectDescription: "", businessDomain: ""});
  const [headerData, setHeaderData] = useState({ estName: "", estDescription: "",effortUnit: "",totalCost: 0,estTypeId: {}});
  const [loaderComponent, setLoader] = useLoader();
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  const [openRequirementTable, setOpenRequirementTable] = useState(false);

  useEffect(() => {
    getById();
  }, [estimationId]);

  

  const getById = () => {
    getBasicDetailById();
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

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'age', headerName: 'Age', type: 'number', editable: true },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      type: 'dateTime',
      width: 220,
      editable: true,
    },
  ];
  
  const rowData = [
    {
      id: 1,
      name: "a",
      age: 25,
      dateCreated: 11/12/2021,
      lastLogin: 10/12/2021,
    },
    {
      id: 2,
      name: "a",
      age: 36,
      dateCreated: 11/12/2021,
      lastLogin: 10/12/2021,
    },
    {
      id: 3,
      name: "a",
      age: 19,
      dateCreated: 11/12/2021,
      lastLogin: 10/12/2021,
    },
    {
      id: 4,
      name: "a",
      age: 28,
      dateCreated: 11/12/2021,
      lastLogin: 10/12/2021,
    },
    {
      id: 5,
      name: "a",
      age: 23,
      dateCreated: 11/12/2021,
      lastLogin: 10/12/2021,
    },
  ];


  
  ///============== JS- Resource Count Pop up and table - START ==============///

   ///============== JS- Resource Count Pop up and table - END ==============///

  return (
    <div className="estimation-detail-cover">
       {/*========= JSX- Resource Count Pop up and table - START ========= */}
       <ResourceCountMatrix
        data={estimationId}
        />
      {/* ///========= JSX- Resource Count Pop up and table - END =========/// */}
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
              <> Edit Estimation Configuration</>
            </Button>
          </Link>
        </Box>
      </Container>
      <EstimationHeader data={headerData} />
      <ClientProjectHeader client={clientDetails} project={projectDetails} />
      <Container>
        <Box sx={{ width: "100%" }} className="estimation-detail-box">
                
               <Box sx={{ width: "20px" }} className="estimation-detail-box" />
       
        </Box>
      </Container>
      <BorderedContainer>
        {loaderComponent ? (
          loaderComponent
        ) : (
            <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={rowData}
              columns={columns}
              isCellEditable={(params) => params.row.age % 2 === 0}
            />
      </div>
        )}
      </BorderedContainer>

    </div>
  );
};

export default RequirementMix;
