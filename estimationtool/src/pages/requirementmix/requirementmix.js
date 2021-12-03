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

const RequirementMix = () => {
  const location = useLocation();
  const estimationId = location.state.estimationHeaderId;
  const [clientDetails, setClientDetails] = useState({ _id: "",clientName: "",description: "",website: ""});
  const [projectDetails, setProjectDetails] = useState({ _id: "",projectName: "", projectDescription: "", businessDomain: ""});
  const [headerData, setHeaderData] = useState({ estName: "", estDescription: "",effortUnit: "",totalCost: 0,estTypeId: {}});
  const [loaderComponent, setLoader] = useLoader();
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
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
    { title: "S.no", field: "count", width: "5%" },
    {
      title: "Allocation%",
      field: "allocation",
      width: "40%",
    },
    { title: "Role", field: "role", width: "20%" },
    {
      title: "Skills(Effort & Summary Attributes)",
      field: "skill",
      width: "50%",
    },{ title: "Cost", field: "cost", width: "20%" },
    {
      title: "Price",
      field: "price",
      width: "20%"
    },
  ];

  //Mock data resource planning 
const rowData = [
    {
      count: 1,
      allocation: "100.00",
      role: "Lead",
      skill: "React/Angular",
      cost: "00.00",
      price: "00.00"
  
    },
    {
        count: 2,
        allocation: "50.00",
        role: "Sr",
        skill: "React/Angular",
        cost: "00.00",
        price: "00.00"
    },
    {
        count: 3,
        allocation: "25.00",
        role: "Jr",
        skill: "React/Angular",
        cost: "00.00",
        price: "00.00"
    },
  ];

  return (
    <div className="estimation-detail-cover">
 
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
          <MaterialTable
            style={{ boxShadow: "none" }}
            title={`Resource Planning`}
            columns={columns}
            data={rowData}
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

    </div>
  );
};

export default RequirementMix;
