import { Button, Container } from "@material-ui/core";
import { Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { EditOutlined, Add, SaveOutlined, Edit } from "@material-ui/icons";
import MaterialTable from "material-table";
import EstimationService from "../estimation-detail/estimation.service";
import { useLocation, Link } from "react-router-dom";
import useLoader from "../../shared/layout/hooks/useLoader";
import {
  EstimationHeader,
  ClientProjectHeader,
} from "../estimation-detail/header-element";
import ResourceCountMatrix from "../resourcemix/ResourceCount";
import { DataGrid } from "@material-ui/data-grid";
import RequirementMixService from "./requirementMix.service";

const RequirementMix = () => {
  const location = useLocation();
  const estimationId = location.state.estimationHeaderId;
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
  const [loaderComponent, setLoader] = useLoader();
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  const [openRequirementTable, setOpenRequirementTable] = useState(false);

  const [resourceMixList, setResourceMixList] = useState();

  useEffect(() => {
    getById();
    getAllResourceMixData();
  }, [estimationId]);

  const getById = () => {
    getBasicDetailById();
  };

  const getAllResourceMixData = () => {
    RequirementMixService.getResourceMixData()
      .then((res) => {
        let newRes = [];
        res.data.body.ResourceMixList.map((el, i) =>
          newRes.push({ sno: i, ...el })
        );
        setResourceMixList(newRes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(resourceMixList);

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
    { field: "sno", headerName: "S. No.", width: 180 },
    {
      field: "allocation",
      headerName: "Allocation %",
      type: "number",
    },
    {
      field: "role",
      headerName: "Role",
      type: "string",
      width: 180,
      valueFormatter: (params) => {
        console.log(params.row.role.name);
        const { row } = params,
          { role } = row,
          { name } = role;

        return name || {};
      },
    },
    {
      field: "skills",
      headerName: "Skills",
      type: "string",
      width: 220,
    },
    {
      field: "cost",
      headerName: "Cost",
      type: "number",
      width: 220,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 220,
    },
  ];

  const rowData = [];
  ///============== JS- Resource Count Pop up and table - START ==============///

  ///============== JS- Resource Count Pop up and table - END ==============///

  return (
    <div className="estimation-detail-cover">
      {/*========= JSX- Resource Count Pop up and table - START ========= */}
      <ResourceCountMatrix data={estimationId} />
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
      <ClientProjectHeader client={clientDetails} project={projectDetails} />
      <EstimationHeader data={headerData} />
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
              rows={resourceMixList}
              columns={columns}
              isCellEditable={(params) => params.row.age % 2 === 0}
              getRowId={({ _id }) => _id}
              key="_id"
            />
          </div>
        )}
      </BorderedContainer>
    </div>
  );
};

export default RequirementMix;
