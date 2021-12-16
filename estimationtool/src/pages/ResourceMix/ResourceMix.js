import { Button, Container } from "@material-ui/core";
import { Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { useLocation, Link } from "react-router-dom";
import useLoader from "../../shared/layout/hooks/useLoader";
import {
  EstimationHeader,
  ClientProjectHeader,
} from "../estimation-detail/header-element";
import { DataGrid } from "@material-ui/data-grid";
import ResourceMixService from "./ResourceMix.service";
import styleClasses from "./resourcemix.module.css";
import { useTableStyle } from "../../shared/ui-view/table/TableStyle";
import ResourceCountService from "../ResourceCount/resourcecount.service";
import { useSelector, useDispatch } from "react-redux";

const RequirementMix = () => {
  const resMixData = useSelector((state) => state.resourceMixData);

  const classes = useTableStyle();
  const location = useLocation();
  const estimationId = location.state !== undefined ?   location.state.estimationHeaderId : resMixData.data.estHeadId;
  const clientDetails = location.state !== undefined ? location.state.clientInfo : resMixData.data;
  const projectDetails = location.state !== undefined ? location.state.projectInfo : resMixData.data;
  const headerData = location.state !== undefined ? location.state.headerData : resMixData.data;

  const [loaderComponent, setLoader] = useLoader();

  const [resourceMixList, setResourceMixList] = useState([]);
  const [totalMargin, setTotalMargin] = useState({});

  useEffect(() => {
    getResourceCountData(estimationId);
  }, [estimationId]);

  const getResourceCountData = (estimationHeaderId) => {
    ResourceCountService.getResourceCount(estimationHeaderId)
      .then((res) => {
        getAllResourceMixData(estimationId);
      })
      .catch((err) => {});
  };

  const getAllResourceMixData = (estimationId) => {
    setLoader(true)
    ResourceMixService.getResourceMixData(estimationId) //619e3ddb8c705cf78e273c02
      .then((res) => {
        console.log("mixdata", res);
        setLoader(false)
        let objArr = res.data.body.resourceMixData.map((el, i) => {
          return {
            id: i + 1,
            allocationPercent: el.resourceMix.allocationPercent,
            resourceRole: el.resourceMix.role.resourceRole,
            attributeName: el.attributeName || null,
            // estCalId: el.attributeSkill.attributeName || null,
            cost: el.costcal,
            price: el.pricecal,
          };
          // if (!el.attributeSkill.calcAttributeName) {
          //   return {
          //     id: i + 1,
          //     allocationPercent: el.resourceMix.allocationPercent,
          //     resourceRole: el.resourceMix.role.resourceRole,
          //     attributeName: el.attributeSkill.attributeName,
          //     cost: el.costcal,
          //     price: el.pricecal,
          //   };
          // } else {
          //   return {
          //     id: i + 1,
          //     allocationPercent: el.resourceMix.allocationPercent,
          //     resourceRole: el.resourceMix.role.resourceRole,
          //     calcAttributeName: el.attributeSkill.calcAttributeName,
          //     cost: el.costcal,
          //     price: el.pricecal,
          //   };
          // }
        });
        console.log(objArr);
        setResourceMixList(objArr);
        setTotalMargin({
          cost: res.data.body.total.cost,
          price: res.data.body.total.price,
          margin: res.data.body.margin,
          marginPercent: res.data.body.marginPercent,
        });
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
      headerName: "Cost ($)",
      sortable: false,
      width: 160,
    },
    {
      field: "price",
      headerName: "Price ($)",
      sortable: false,
      width: 160,
    },
  ];
  console.log(resourceMixList, totalMargin);

  return (
    <div className="estimation-detail-cover">
      <Container>
        <Box sx={{ width: "100%" }} className="estimation-detail-box" mt={2}>
          {/* <Link
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
          </Link> */}
        </Box>
      </Container>
      <ClientProjectHeader client={clientDetails} project={projectDetails} />
      <EstimationHeader data={headerData} />
      <BorderedContainer>
        {loaderComponent ? (
          loaderComponent
        ) : (
          <>
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
            <div className={styleClasses.totalcontainer}>
              <div className={styleClasses.totalRow}>
                <div className={styleClasses.total_item}>
                  <h4>
                    Total Cost: <span>{totalMargin.cost}</span>
                  </h4>
                </div>
                <div className={styleClasses.total_item}>
                  <h4>
                    Total Price: <span>{totalMargin.price}</span>
                  </h4>
                </div>
              </div>
              <div className={styleClasses.total_item}>
                <h4>
                  Margin = Price - Cost: <span>{totalMargin.margin}</span>
                </h4>
              </div>
              <div className={styleClasses.total_item}>
                <h4>
                  Margin: <span>{totalMargin.marginPercent}</span>
                </h4>
              </div>
            </div>
          </>
        )}
      </BorderedContainer>
    </div>
  );
};

export default RequirementMix;
