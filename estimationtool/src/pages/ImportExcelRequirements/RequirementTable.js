import React, { useState, useEffect } from "react";
import { Button, Grid, Box } from "@material-ui/core";
import useLoader from "../../shared/layout/hooks/useLoader";
import Checkbox from "@mui/material/Checkbox";
import "./Requirements.css";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import { BiErrorAlt, BiCheckCircle } from "react-icons/bi";
import { ImSigma } from "react-icons/im";
import { VscTools } from "react-icons/vsc";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { useTableStyle } from "../../shared/ui-view/table/TableStyle";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridActionsCellItem,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbar,
} from "@mui/x-data-grid";
import { makeStyles, createStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";
import { ClassNames } from "@emotion/react";
import { dark } from "@material-ui/core/styles/createPalette";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import StarIcon from "@mui/icons-material/Star";

import { MdPlaylistAdd, MdEditNote } from "react-icons/md";

import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineNumber } from "react-icons/ai";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";

import { MdOpenInBrowser, MdDone } from "react-icons/md";
import { AiOutlineDeleteRow } from "react-icons/ai";

function CustomFooterStatusComponent(props) {
  return (
    <Box sx={{ padding: "10px", display: "flex" }}>
      <p>
        Total records: {props.noOfRecords}
        <br></br>
        Error found: 5<br></br>
        Modification made: 4<br></br>
        Records inserted: 4
      </p>
    </Box>
  );
}
CustomFooterStatusComponent.propTypes = {
  noOfRecords: PropTypes.oneOf(["connected", "disconnected"]).isRequired,
};

export const RequirementTable = (props) => {
  const classes = useTableStyle();
  const [pageSize, setPageSize] = React.useState(10);
  const [loaderComponent, setLoader] = useLoader(false);
  const [requirementHeader, setSummaryHeaderArray] = useState([
    { headerName: "S.R No.", field: "id", width: 70 },
    {
      headerName: "Error",
      field: "Error",
      width: 80,
      headerAlign: "center",
      cellClassName: "align-center_error",
      renderCell: (params) => (
        <ErrorComponent color={params.color} {...params} />
      ),
    },
    { headerName: "Requirement", field: "Requirement", width: 170 },
    { headerName: "Description", field: "Description", width: 200 },
    { headerName: "Tag", field: "Tag", width: 100 },
    { headerName: "Type", field: "Type", width: 100 },
    { headerName: "Query", field: "Query", width: 200 },
    { headerName: "Assumption", field: "Assumption", width: 200 },
    { headerName: "Reply", field: "Reply", width: 200 },
  ]);

  const [requirementHeaderDataFilter, setFilterRequirementHeaderData] =
    useState([]);
  const [requirementHeaderData, setRequirementHeaderData] = useState([]);
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const [requirementSummary, setRequirementSummary] = useState({
    noOfRecords: 0,
    noOfError: 0,
    noOfModification: 0,
    noOfRecordsInserted: 0,
  });
  useEffect(() => {
    setRequirementHeaderData([...props.requirementHeaderData]);
    console.log("useEffect");
  }, [props.requirementHeaderData, props.requirementTypeArray]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const deleteSelected = () => {
    if (requirementHeaderDataFilter.length !== 0) {  
      props.deleteSelected(requirementHeaderDataFilter);
       setFilterRequirementHeaderData([]);
    }
  };

  console.log("requirementHeaderDataFilter: ", requirementHeaderDataFilter);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      {loaderComponent ? (
        loaderComponent
      ) : (
        <>
          
          <div>
       { requirementHeaderDataFilter.length !== 0 ?    ( <Grid container className="importFormRowContainer">
              <Grid item xs={8} className="importFormRow"></Grid>
              <Grid item xs={4} className="importFormRow_Button">
                <Button  onClick={deleteSelected} variant="outlined">
                  <AiOutlineDeleteRow style={{ fontSize: "20px" }} />
                    &nbsp;  {`Remove Selected Requirement${requirementHeaderDataFilter.length > 1 ? "s" : ""}`}
                </Button>
              </Grid>
              </Grid>) : null
      }
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                className={`${classes.root} ${classes.dataGrid}`}
                rows={requirementHeaderData}
                columns={requirementHeader}
                hideFooterPagination={false}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 20, 50]}
                pagination
                checkboxSelection={props.selection}
                onRowClick={(params, event) => {
                  if (props.isEditable) {
                    props.openEditRequirement(event, params.row);
                  }
                }}
                onSelectionModelChange={(rows) => {
                  console.log("onSelectionModelChange: ", rows);
                  setFilterRequirementHeaderData(rows);
                  
                }}
                selectionModel={requirementHeaderDataFilter} //
              />
            </div>
            <div style={{  width: "100%" }}>
              {requirementHeaderData.length !== 0 ? (
                <Box
                  className="import-report"
                  sx={{ padding: "10px", display: "flex" }}
                >
                  <p className="report report_total">
                    <ImSigma style={{ fontSize: "18px" }} />
                    &nbsp;Total records:&nbsp;
                    <span className="report_item">
                      {props.requirementSummary.noOfRecords}
                    </span>
                  </p>
                  {props.requirementSummary.noOfError !== 0 ? (
                    <p className="report report_error">
                      <BiErrorAlt style={{ fontSize: "18px" }} />
                      &nbsp;No of error:&nbsp;
                      <span className="report_item">
                        {props.requirementSummary.noOfError}
                      </span>
                    </p>
                  ) : null}
                  {props.requirementSummary.noOfModification !== 0 ? (
                    <p className="report report_modify">
                      <VscTools style={{ fontSize: "18px" }} />
                      &nbsp;No of modification:&nbsp;
                      <span className="report_item">
                        {props.requirementSummary.noOfModification}
                      </span>
                    </p>
                  ) : null}
                  {props.requirementSummary.action === 4 ? (
                    <p className="report report_error">
                      <BiErrorAlt style={{ fontSize: "18px" }} />
                      &nbsp;Please fix the error and try again !&nbsp;
                      <span className="report_item"></span>
                    </p>
                  ) : null}
                  {props.requirementSummary.noOfRecordsInserted !== 0 ? (
                    <p className="report report_add">
                      <MdOutlineFileDownloadDone style={{ fontSize: "18px" }} />
                      &nbsp;Excel file has been successfully imported. Number of
                      records inserted:&nbsp;
                      <span className="report_item">
                        {props.requirementSummary.noOfRecordsInserted}
                      </span>
                    </p>
                  ) : null}
                </Box>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const RequirementTablePopup = (props) => {
  return (
    <>
      <CustomizedDialogs
        isOpen={props.isOpen}
        openFun={props.openF}
        closeFun={props.closeF}
        title={props.title}
        oktitle={props.oktitle}
        cancelTitle={props.cancelTitle}
        saveFun={props.saveFun}
        width={"lg"}
      >
        <RequirementTable
          requirementHeaderData={props.requirementHeaderData}
          requirementSummary={props.requirementSummary}
          openEditRequirement={() => {}}
          isEditable={false}
          selection={true}
          requirementTypeArray={props.requirementTypeArray}
          handleCheckBoxClicked={props.handleCheckBoxClicked}
        />
      </CustomizedDialogs>
    </>
  );
};

export const ErrorComponent = (props) => {
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
      padding: "10px",
    },
    [`& .${tooltipClasses.tooltip} ul`]: {
      listStyleType: "none",
    },
  }));

  return props.row.Error.length === 0 ? (
    <BiCheckCircle style={{ color: "green" }} />
  ) : (
    <HtmlTooltip
      title={
        <React.Fragment>
          <ul>
            {props.row.Error.map((err, i) => (
              <li key={i + 1}>{err}</li>
            ))}
          </ul>
        </React.Fragment>
      }
    >
      <span>
        <BiErrorAlt className="align-center_error" style={{ color: "red" }} />
      </span>
    </HtmlTooltip>
  );
};
