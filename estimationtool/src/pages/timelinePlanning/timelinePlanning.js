import { Button, Container, Box, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import { useLocation, Link } from "react-router-dom";
import useLoader from "../../shared/layout/hooks/useLoader";
import {
  EstimationHeader,
  ClientProjectHeader,
} from "../estimation-detail/header-element";
import { DataGrid } from "@material-ui/data-grid";
import TimelinePlanningService from "./timelinePlanning.service";
import styleClasses from "../ResourceMix/resourcemix.module.css";
import { useTableStyle } from "../../shared/ui-view/table/TableStyle";
import ResourceCountService from "../ResourceCount/resourcecount.service";
import { useSelector, useDispatch } from "react-redux";
import { ExportEstimationPopup } from "../estimation-detail/Export/ExportEstimation";
import { BiExport } from "react-icons/bi";

const TimelinePlanning = () => {
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
  const [noOfWeeks, setNoOfWeeks] = useState({});
  const [openExport, setOpenExport] = useState(false);

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
    setLoader(true);
    TimelinePlanningService.getTimelinePlanningData(estimationId) //619e3ddb8c705cf78e273c02
      .then((res) => {
        console.log("mixdata", res);
        setLoader(false);
        const mixData = res.data.body.resourceMixData;
        const weeks =
          res.data.body.resourceMixData[0].estimationHeader
            .estTentativeTimeline;
        let objArr = res.data.body.timelinePlanning.map((el, i) => {
          let result = {};
          result.id = i + 1;
          result.resourceRole = el.resourceRole;
          result.attributeName = el.attributeName || null;
          result.totalHours = el.totalHours;
          for (let i = 1; i <= weeks; i++) {
            const str = "week" + i;
            result[str] = el.week1;
          }
          return result;
        });
        setResourceMixList(objArr);
        setTotalMargin({
          totalNumberOfHours: res.data.body.totalNumberOfHours,
        });
        setNoOfWeeks({
          noOfWeeks:
            res.data.body.resourceMixData[0].estimationHeader
              .estTentativeTimeline,
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
      sortable: false,
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
  ];
  for (let i = 1; i <= noOfWeeks.noOfWeeks; i++) {
    const col = {};
    col.field = "week" + i.toString();
    col.headerName = "Week" + i.toString();
    col.sortable = false;
    col.width = 160;
    columns.push(col);
  }
  columns.push({
    field: "totalHours",
    headerName: "Total Hours",
    sortable: false,
    width: 280,
  });
  console.log(resourceMixList, totalMargin);

  return (
    <div className="estimation-detail-cover">
      {/*========= JSX- Export Estimation in Report - START ========= */}
      <ExportEstimationPopup
        openExport={openExport}
        openExportEstimation={openExportEstimation}
        closeExportEstimation={closeExportEstimation}
        title="Export Estimation"
        oktitle="Genrate"
        cancelTitle="Cancel"
        exportFun={exportFun}
      />
      {/*========= JSX- Export Estimation in Report - END ========= */}
      <Container>
        <Grid container>
          <Grid item className="multi-button-grid">
            <Button variant="outlined" onClick={openExportEstimation}>
              <BiExport style={{ fontSize: "18px" }} />
              &nbsp;Export in Excel
            </Button>
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
                columns={columns}
                pageSize={100}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </div>
            <div className={styleClasses.totalcontainer}>
              <div className={styleClasses.totalRow}>
                <div className={styleClasses.total_item}>
                  <h4>
                    Gr. Total: <span>{totalMargin.totalNumberOfHours}</span>
                  </h4>
                </div>
              </div>
            </div>
          </>
        )}
      </BorderedContainer>
    </div>
  );
};

export default TimelinePlanning;
