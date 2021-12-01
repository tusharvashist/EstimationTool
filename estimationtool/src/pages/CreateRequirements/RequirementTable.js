import React, { useState, useEffect } from "react";
import { Button, Grid, ListItem } from "@material-ui/core";
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
import { DataGrid } from '@mui/x-data-grid';

export const RequirementTable = (props) => {
  const location = useLocation();
  const clientInfo = { ...location.state.clientInfo };
  const projecttInfo = { ...location.state.projectInfo };
  const [loaderComponent, setLoader] = useLoader(false);
   const [requirementHeader, setSummaryHeaderArray] = useState([
    { headerName: "Requirement", field: "Requirement" ,width: 170 },
    { headerName: "Description", field: "Description" ,width: 130 },
    { headerName: "Tag", field: "Tag",width: 70  },
    { headerName: "Type", field: "Type",width: 70  },
    { headerName: "Query", field: "Query" ,width: 130 },
    { headerName: "Assumption", field: "Assumption" ,width: 130 },
    { headerName: "Reply", field: "Reply" ,width: 130 },
  ]);


  const [requirementHeaderDataFilter, setFilterRequirementHeaderData] =
    useState([]);
  const [requirementHeaderData, setRequirementHeaderData] = useState([]);
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const [available, setAvailable] = useState([]);
  //const [requirementTypeArray, setRequirementTypeArray] = useState([]);


  useEffect(() => {
    setRequirementHeaderData( [...props.requirementHeaderData]);
    setFilterRequirementHeaderData([...props.requirementHeaderData]);
   // setRequirementTypeArray([...props.requirementTypeArray]);
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

  const filter =  (value) => {
    if (value.length !== 0) {
      var filterData = [];
      value.map((element) => {
        filterData.push(requirementHeaderData.filter((requirementData) => requirementData.Type === element))
      })
      
      setFilterRequirementHeaderData(filterData.flat());
      
    } else {
       setFilterRequirementHeaderData(requirementHeaderData);
    }
  };

  //console.log("requirementHeaderDataFilter: ", requirementHeaderDataFilter);

  //console.log("available: ", available);
  return (
    <>
      {loaderComponent ? (
        loaderComponent
      ) : (
        <>
          <div className="addReqTableHeader">
            <h3>Requirements</h3>
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
            </div>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                 rows={requirementHeaderDataFilter}
                 columns={requirementHeader}
                 pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
              </div>
          {/* <MaterialTable
            style={{ boxShadow: "none" }}
            columns={requirementHeader}
            data={requirementHeaderDataFilter}
            editable={"never"}
            onRowClick={(event, rowData, togglePanel) => {
              if (props.isEditable) {
                props.openEditRequirement(event, rowData);
              }
            }}
              onSelectionChange={(rows) => {
                if (props.selection === true) {
                  props.handleCheckBoxClicked(rows);
                }
                
              }}
            options={{
              search: false,
              selection: props.selection,
              showTitle: false,
              showTextRowsSelected: true,
              headerStyle: {
                backgroundColor: "#e5ebf7",
                fontWeight: "bold",
                fontSize: "0.9rem",
                color: "#113c91",
              },
            }}
          /> */}
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
