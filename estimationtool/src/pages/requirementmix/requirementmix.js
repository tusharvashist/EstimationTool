import { Button, Container } from "@material-ui/core";
import { Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
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

import NNoRowOverlay from "../../shared/ui-view/NoRowOverlay/NoRowOverlay";
import RoleCount from "../resourcemix/RoleCount";

const RequirementMix = () => {
  const location = useLocation();
  const estimationId = location.state.estimationHeaderId;
  const clientDetails = location.state.clientInfo;
  const projectDetails = location.state.projectInfo;
  const headerData = location.state.headerData;

  const [loaderComponent, setLoader] = useLoader();

  const [resourceMixList, setResourceMixList] = useState([]);

  useEffect(() => {
    getAllResourceMixData(estimationId);
  }, [estimationId]);

  const getAllResourceMixData = (estimationId) => {
    RequirementMixService.getResourceMixData("619e3ddb8c705cf78e273c02")
      .then((res) => {
        let objArr = res.data.body.resourceMixData.map((el, i) => {
          return {
            id: i + 1,
            allocationPercent: el.resourceMix.allocationPercent,
            resourceRole: el.resourceMix.role.resourceRole,
            attributeName: el.attributeSkill.attributeName,
            cost: el.costcal,
            price: el.pricecal,
          };
        });
        console.log(objArr);
        setResourceMixList(objArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "S No.",
      width: 120,
      sortable: false,
    },
    {
      field: "allocationPercent",
      headerName: "Allocation %",
      sortable: false,
      width: 170,
    },
    {
      field: "resourceRole",
      headerName: "Role",
      sortable: false,
      width: 150,
    },
    {
      field: "attributeName",
      headerName: "Skills(Effort & Summary Attributes)",
      sortable: false,
      width: 280,
    },
    {
      field: "cost",
      headerName: "Cost",
      sortable: false,
      width: 160,
    },
    {
      field: "price",
      headerName: "Price",
      sortable: false,
      width: 160,
    },
  ];

  console.log(resourceMixList);

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
      <ClientProjectHeader client={clientDetails} project={projectDetails} />
      <EstimationHeader data={headerData} />
      <BorderedContainer>
        {loaderComponent ? (
          loaderComponent
        ) : (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={resourceMixList}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              // components={{
              //   NoRowsOverlay: NNoRowOverlay,
              // }}
            />
          </div>
        )}
      </BorderedContainer>
    </div>
  );
};

export default RequirementMix;
