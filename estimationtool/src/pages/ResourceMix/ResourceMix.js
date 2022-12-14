import { Button, Container, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { useLocation } from "react-router-dom";
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
import { useSelector } from "react-redux";
import { BiExport } from "react-icons/bi";
import { ExportEstimationPopup } from "../estimation-detail/Export/ExportEstimation";
import usePermission from "../../shared/layout/hooks/usePermissions";
import useEstPermission from "../../shared/layout/hooks/useEstPermission";
import Tooltip from "@material-ui/core/Tooltip";

const RequirementMix = () => {
  const resMixData = useSelector((state) => state.resourceMixData);

  const classes = useTableStyle();
  const location = useLocation();
  const estimationId =
    location.state !== undefined
      ? location.state.estimationHeaderId
      : resMixData.data.estHeadId;
  const clientDetails =
    location.state !== undefined ? location.state.clientInfo : resMixData.data;
  const projectDetails =
    location.state !== undefined ? location.state.projectInfo : resMixData.data;
  const headerData =
    location.state !== undefined ? location.state.headerData : resMixData.data;

  const [loaderComponent, setLoader] = useLoader();

  const [resourceMixList, setResourceMixList] = useState([]);
  const [totalMargin, setTotalMargin] = useState({});
  const [openExport, setOpenExport] = useState(false);
  const { estimation_export_resourcemix, estimation_pricing_view } =
    usePermission();

  const { this_estimation_export_resourcemix, this_estimation_pricing_view } =
    useEstPermission();

  const finalEstPermission = {
    checkExportResourceMix: () => {
      return this_estimation_export_resourcemix == undefined
        ? estimation_export_resourcemix
        : this_estimation_export_resourcemix;
    },
    checkPricingView: () => {
      return this_estimation_pricing_view == undefined
        ? estimation_pricing_view
        : this_estimation_pricing_view;
    },
  };

  useEffect(() => {
    getResourceCountData();
  }, [estimationId]);

  const getResourceCountData = () => {
    ResourceCountService.getResourceCount(estimationId)
      .then((res) => {
        getAllResourceMixData();
      })
      .catch((err) => {});
  };

  const getAllResourceMixData = () => {
    setLoader(true);
    ResourceMixService.getResourceMixData(estimationId) //619e3ddb8c705cf78e273c02
      .then((res) => {
        console.log("mixdata", res);
        setLoader(false);
        let objArr = res.data.body.resourceMixData.map((el, i) => {
          return {
            id: i + 1,
            allocationPercent: el.resourceMix.allocationPercent,
            resourceRole: el.resourceMix.role.resourceRole,
            attributeName: el.attributeName || null,
            cost: el.costcal,
            price: el.pricecal,
            costrate: el.resourceMix.role.cost,
            pricerate: el.resourceMix.role.price,
          };
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

  ///============== JS- Export Estimation Pop up - START ==============///
  const openExportEstimation = () => {
    setOpenExport(true);
  };

  const closeExportEstimation = () => {
    setOpenExport(false);
  };

  const exportFun = (a) => {
    console.log(a);
  };
  ///============== JS- Export Estimation Pop up - END ==============///
  const columns = [
    {
      field: "id",
      headerName: "S No.",
      width: 120,
    },
    {
      field: "allocationPercent",
      headerName: "Allocation %",

      width: 170,
    },
    {
      field: "resourceRole",
      headerName: "Role",

      width: 150,
    },
    {
      field: "attributeName",
      headerName: "Skills(Effort & Summary Attributes)",

      width: 280,
    },
    {
      field: "costrate",
      headerName: "Cost/Hr ($)",
      hide: !finalEstPermission.checkPricingView(),
      width: 160,
    },
    {
      field: "pricerate",
      headerName: "Price/Hr ($)",
      hide: !finalEstPermission.checkPricingView(),
      width: 160,
    },
    {
      field: "cost",
      headerName: "Cost ($)",
      hide: !finalEstPermission.checkPricingView(),

      width: 160,
    },
    {
      field: "price",
      headerName: "Price ($)",
      hide: !finalEstPermission.checkPricingView(),

      width: 160,
    },
  ];

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
      <Container>
        <Grid container>
          <Grid item className="multi-button-grid">
            {finalEstPermission.checkExportResourceMix() && (
              <Button variant="outlined" onClick={openExportEstimation}>
                <BiExport style={{ fontSize: "18px" }} />
                &nbsp;Export in Excel
              </Button>
            )}
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
          </Grid>
        </Grid>
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
                disableColumnMenu
                className={`${classes.root} ${classes.dataGrid}`}
                rows={resourceMixList}
                columns={columns.map((column) => ({
                  ...column,
                  sortable: false,
                }))}
                // columns={columns}
                pageSize={100}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </div>
            {finalEstPermission.checkPricingView() && (
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
                  <Tooltip title="Margin Formula = [((Price -Cost)/Price) X 100]">
                    <h4>
                      Margin: <span>{totalMargin.marginPercent}</span>
                    </h4>
                  </Tooltip>
                </div>
              </div>
            )}
          </>
        )}
      </BorderedContainer>
    </div>
  );
};

export default RequirementMix;
