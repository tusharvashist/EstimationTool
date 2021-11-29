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
  const [requirementHeaderData, setRequirementHeaderData] = useState([]);
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const [available, setAvailable] = useState(["EPIC"]);

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
  };

  return (
    <>
      {loaderComponent ? (
        loaderComponent
      ) : (
        <>
          <MaterialTable
            style={{ boxShadow: "none" }}
            title={`Requirements`}
            columns={requirementHeader}
            data={props.requirementHeaderData}
            editable={"never"}
            options={{
              search: false,
              selection: true,
              headerStyle: {
                backgroundColor: "#e5ebf7",
                fontWeight: "bold",
                fontSize: "0.9rem",
                color: "#113c91",
              },
            }}
            actions={[
              {
                icon: () => (
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
                ),
                isFreeAction: true,
              },
            ]}
          />
        </>
      )}
    </>
  );
};

export const RequirementTableWithFilter = () => {
  const [openAddRequirementsBox, setOpenAddRequirementsBox] = useState(false);
  const openAddRequirement = () => {
    openAddFun();
  };

  const openAddFun = () => {
    setOpenAddRequirementsBox(true);
  };

  return (
    <>
      <Grid container justifyContent="flex-end">
        <Grid item style={{ margin: "10px" }}>
          <Button onClick={openAddRequirement} variant="outlined">
            {" "}
            <AddIcon />
            Filter
          </Button>
        </Grid>
      </Grid>
      <RequirementTable />
    </>
  );
};
