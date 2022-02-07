import React, { useState, useEffect } from "react";
import { Button, Grid, Box } from "@material-ui/core";
import "./Requirements.css";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import { BiErrorAlt, BiCheckCircle } from "react-icons/bi";
import { ImSigma } from "react-icons/im";
import { VscTools } from "react-icons/vsc";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useTableStyle } from "../../shared/ui-view/table/TableStyle";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
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
  const requirementHeader = [
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
  ];

  const [requirementHeaderDataFilter, setFilterRequirementHeaderData] =
    useState([]);
  const [requirementHeaderData, setRequirementHeaderData] = useState([]);

  useEffect(() => {
    setRequirementHeaderData([...props.requirementHeaderData]);
    console.log("useEffect");
  }, [props.requirementHeaderData, props.requirementTypeArray]);

  const deleteSelected = () => {
    if (requirementHeaderDataFilter.length !== 0) {
      props.deleteSelected(requirementHeaderDataFilter);
      setFilterRequirementHeaderData([]);
    }
  };

  return (
    <>
      <div>
        <Grid container className="importFormRowContainer">
          <Grid item xs={8} className="importFormRow"></Grid>
          <Grid item xs={4} className="importFormRow_Button">
            <Button
              onClick={deleteSelected}
              disabled={requirementHeaderDataFilter.length !== 0 ? false : true}
              variant="outlined"
            >
              <AiOutlineDeleteRow style={{ fontSize: "20px" }} />
              &nbsp;{" "}
              {`Remove Selected Requirement${
                requirementHeaderDataFilter.length > 1 ? "s" : ""
              }`}
            </Button>
          </Grid>
        </Grid>

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
            disableSelectionOnClick
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
        <div style={{ width: "100%" }}>
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
          isEditable={false}
          selection={true}
          requirementTypeArray={props.requirementTypeArray}
          handleCheckBoxClicked={props.handleCheckBoxClicked}
        />
      </CustomizedDialogs>
    </>
  );
};

export const ErrorComponent = (errProps) => {
  const HtmlTooltip = styled(({ className, ...tooltipProps }) => (
    <Tooltip {...tooltipProps} classes={{ popper: className }} />
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

  return errProps.row.Error.length === 0 ? (
    <BiCheckCircle style={{ color: "green" }} />
  ) : (
    <HtmlTooltip
      title={
        <React.Fragment>
          <ul>
            {errProps.row.Error.map((err, i) => (
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
