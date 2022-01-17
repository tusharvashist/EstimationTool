import React, { useState, useEffect } from "react";
import { Button, Grid, ListItem, Box } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
import AddRequirements from "../estimation-detail/add-requirements-popup";
import { ClientProjectHeader } from "../estimation-detail/header-element";
import useLoader from "../../shared/layout/hooks/useLoader";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
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
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import StarIcon from '@mui/icons-material/Star';

import { MdPlaylistAdd ,MdEditNote} from "react-icons/md";

import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineNumber } from "react-icons/ai";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
function CustomFooterStatusComponent(props) {
  return (
    <Box sx={{ padding: '10px', display: 'flex' }}>
      <p>Total records: {props.noOfRecords} 
        <br></br>
        Error found: 5
        <br></br>
        Modification made: 4
        <br></br>
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

  // const classes = useStyles();
  const location = useLocation();
  const [pageSize, setPageSize] = React.useState(10);
  const clientInfo = { ...location.state.clientInfo };
  const projecttInfo = { ...location.state.projectInfo };
  const [loaderComponent, setLoader] = useLoader(false);
  
  const [isDeleted, setIsDeleted] = useLoader(false);
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
  
  const deleteUser = (params) => {
    setIsDeleted(!isDeleted);
    console.log("delete",params);
  }
  
  const [requirementHeaderDataFilter, setFilterRequirementHeaderData] =
    useState([]);
  const [requirementHeaderData, setRequirementHeaderData] = useState([]);
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const [available, setAvailable] = useState(["EPIC", "FEATURE", "STORY"]);
  //const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  const [requirementSummary, setRequirementSummary] = useState({
    noOfRecords: 0,
    noOfError: 0,
    noOfModification: 0,
    noOfRecordsInserted: 0,
  });
  useEffect(() => {
    setRequirementHeaderData([...props.requirementHeaderData]);
    setFilterRequirementHeaderData([...props.requirementHeaderData]);
    console.log("useEffect");
  }, [props.requirementHeaderData, props.requirementTypeArray]);

  const openAddRequirement = () => {
    openAddFun();
  };

  const openAddFun = () => {
    setOpenAddRequirementsBox(true);
  };

  const closeAddFun = () => {
    setOpenAddRequirementsBox(false);
  };

  const saveAddRequirementsFun = () => {
    closeAddFun();
  };

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

  const types = ["EPIC", "FEATURE", "STORY"];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAvailable(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(value);
    filter(value);
  };

  const filter = (value) => {
    if (value.length !== 0) {
      var filterData = [];
      value.map((element) => {
        filterData.push(
          requirementHeaderData.filter(
            (requirementData) => requirementData.Type === element
          )
        );
      });

      setFilterRequirementHeaderData(filterData.flat());
    } else {
      setFilterRequirementHeaderData(requirementHeaderData);
    }
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        {/* <GridToolbarFilterButton /> */}
        {/* <GridToolbarDensitySelector /> */}
        {/* <GridToolbarExport /> */}
      </GridToolbarContainer>
    );
  }

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        "& .MuiDataGrid-columnHeaderWrapper": {
          backgroundColor: "rgb(229, 235, 247)",
        },
      },
    })
  );
  console.log("requirementHeaderDataFilter: ", requirementHeaderDataFilter);

  //console.log("available: ", available);
  return (
    <>
      {loaderComponent ? (
        loaderComponent
      ) : (
        <>
          {/* <div className="addReqTableHeader">
            <h3>Requirement Types</h3>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={available}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              style={{ width: "250px" }}
            >
              {types.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={available.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </div> */}
            <div>
            <div style={{ height: 400, width: "100%" }}>
            
            <DataGrid
              className={`${classes.root} ${classes.dataGrid}`}
              rows={requirementHeaderDataFilter}
              columns={requirementHeader}
              // columns={[{ field: "aa", headerAlign:'left' }]}
              hideFooterPagination={false}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 20, 50]}
              pagination
              checkboxSelection={props.selection}
              onRowClick={(params, event) => {
                //selected={(event, rowData, togglePanel) => {
                if (props.isEditable) {
                  props.openEditRequirement(event, params.row);
                }
              }}
              onSelectionModelChange={(rows) => {
                console.log("onSelectionModelChange: ", rows);
                if (props.selection === true) {
                  props.handleCheckBoxClicked(rows);
                }
              }}
            />
            </div>
            <div style={{ height: 200, width: "100%" }}>
            {  requirementHeaderData.length !== 0 ? (
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
            </p>): null}
             {props.requirementSummary.noOfModification !== 0 ? ( <p className="report report_modify">
              <VscTools style={{ fontSize: "18px" }} />
              &nbsp;No of modification:&nbsp;
              <span className="report_item">
                {props.requirementSummary.noOfModification}
              </span>
                    </p>) : null}
                      {props.requirementSummary.action === 4 ? ( <p className="report report_error">
              <BiErrorAlt style={{ fontSize: "18px" }} />
              &nbsp;Please fix the error and try again !&nbsp;
              <span className="report_item">
              </span>
            </p>): null}
            {props.requirementSummary.noOfRecordsInserted !== 0 ? ( <p className="report report_add">
              <MdOutlineFileDownloadDone style={{ fontSize: "18px" }} />
              &nbsp;Excel file has been successfully imported. Number of records inserted:&nbsp;
              <span className="report_item">
                {props.requirementSummary.noOfRecordsInserted}
              </span>
                    </p>) : null}
                    
          </Box>
                
                     ) : null }
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
