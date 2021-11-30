import React, { useState, useEffect } from "react";
import { Button, Grid, ListItem } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
import AddRequirements from "../estimationDetail/AddRequirements";
import { ClientProjectHeader } from "../estimationDetail/HeaderElement";
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

export const RequirementTable = (props) => {
  const location = useLocation();
  const clientInfo = { ...location.state.clientInfo };
  const projecttInfo = { ...location.state.projectInfo };
  const [loaderComponent, setLoader] = useLoader(false);
  const [requirementHeader, setSummaryHeaderArray] = useState([
    { title: "Requirement", field: "Requirement", editable: false },
    { title: "Description", field: "Description", editable: false },
    { title: "Tag", field: "Tag", editable: false },
    { title: "Type", field: "Type", editable: false },
    { title: "Query", field: "Query", editable: false },
    { title: "Assumption", field: "Assumption", editable: false },
    { title: "Reply", field: "Reply", editable: false },
  ]);
  //const [requirementHeaderData, setRequirementHeaderData] = useState([]);

  const [requirementHeaderDataFilter, setFilterRequirementHeaderData] =
    useState([]);
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const [available, setAvailable] = useState(["FEATURE"]);
  const [requirementTypeArray, setRequirementTypeArray] = useState([]);
  var requirementHeaderData = [];

  useEffect(() => {
    requirementHeaderData = props.requirementHeaderData;
    setFilterRequirementHeaderData(props.requirementHeaderData);
    setRequirementTypeArray(props.requirementTypeArray);
  }, [
    props.requirementHeaderData,
    props.requirementTypeArray,
    requirementHeaderData,
    requirementTypeArray,
  ]);
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

  const handleCheckBoxClicked = (row) => {
    console.log(row);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAvailable(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(value);
    // setLoader(true);
    // filter(value, () => {
    //     setLoader(false);
    // })
  };

  const filter = async (value, callBack) => {
    if (value.length !== 0) {
      var list = await requirementHeaderData.filter((mainElement) => {
        return value.some((filterElement) => {
          console.log(filterElement, mainElement.Type);
          if (mainElement.Type === filterElement) {
            return mainElement;
          }
        });
      });
      var val = await setFilterRequirementHeaderData(list);
      callBack();
    } else {
      var val = await setFilterRequirementHeaderData(requirementHeaderData);
      callBack();
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
          <MaterialTable
            style={{ boxShadow: "none" }}
            // title={`Requirements`}
            columns={requirementHeader}
            data={requirementHeaderDataFilter}
            editable={"never"}
            onRowClick={(event, rowData, togglePanel) => {
              if (props.isEditable) {
                props.openEditRequirement(event, rowData);
              }
            }}
            onSelectionChange={(rows) => handleCheckBoxClicked(rows)}
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
          />
        </>
      )}
    </>
  );
};

export const RequirementTablePopup = (props) => {
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const openAddRequirement = () => {
    openAddFun();
  };

  const openAddFun = () => {
    setOpenAddRequirementsBox(true);
  };

  const onSubmitForm = () => {};

  return (
    <>
      <CustomizedDialogs
        isOpen={props.isOpen}
        openFun={props.openF}
        closeFun={props.closeF}
        title={props.title}
        oktitle={props.oktitle}
        cancelTitle={props.cancelTitle}
        saveFun={onSubmitForm}
        width={"lg"}
      >
        <RequirementTable
          requirementHeaderData={props.requirementHeaderData}
          openEditRequirement={() => {}}
          isEditable={false}
          selection={true}
          requirementTypeArray={props.requirementTypeArray}
        />
      </CustomizedDialogs>
    </>
  );
};
