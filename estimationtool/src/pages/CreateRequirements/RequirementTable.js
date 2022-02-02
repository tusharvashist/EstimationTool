import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./Requirements.css";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import {DataGrid} from "@mui/x-data-grid";
import { makeStyles, createStyles } from "@mui/styles";
import DeleteForever from "@material-ui/icons/DeleteForever";

export const RequirementTable = (props) => {
  const requirementHeader = [
    { headerName: "Req. Id", field: "req_id", width: 80 },
    { headerName: "Requirement", field: "Requirement", width: 170 },
    { headerName: "Description", field: "Description", width: 200 },
    { headerName: "Tag", field: "Tag", width: 150 },
    { headerName: "Type", field: "Type", width: 130 },
    { headerName: "Query", field: "Query", width: 200 },
    { headerName: "Assumption", field: "Assumption", width: 200 },
    { headerName: "Reply", field: "Reply", width: 200 },
  ];

  const [requirementHeaderDataFilter, setFilterRequirementHeaderData] =
    useState([]);

  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const [requirementHeaderData, setRequirementHeaderData] = useState([]);
  const [available, setAvailable] = useState(["EPIC", "FEATURE", "STORY"]);

  useEffect(() => {
    setRequirementHeaderData([...props.requirementHeaderData]);
    setFilterRequirementHeaderData([...props.requirementHeaderData]);
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

  const types = ["EPIC", "FEATURE", "STORY"];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAvailable(
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

  const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        "& .MuiDataGrid-columnHeaderWrapper": {
          backgroundColor: "rgb(229, 235, 247)",
        },
      },
    })
  );
  const classes = useStyles();

  const deleteAction = () => {
    props.deleteAction(selectedRequirements);
  };
  return (

        <>
          <div className="addReqTableHeader">
            <Grid container>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Available Requirement Types Filter:
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={available}
                    onChange={handleChange}
                    input={
                      <OutlinedInput label="Available Requirement Types Filter:" />
                    }
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
                </FormControl>
              </Grid>

              {props.isDeleteButton === true && props.selection === true ? (
                <Grid
                  item
                  xs={6}
                  style={{ display: "flex" }}
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button
                    onClick={deleteAction}
                    disabled={selectedRequirements.length !== 0 ? false : true}
                    variant="outlined"
                  >
                    <DeleteForever />
                    {`Delete Selected Requirement${
                      selectedRequirements.length > 1 ? "s" : ""
                    }`}
                  </Button>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </div>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              className={classes.root}
              rows={requirementHeaderDataFilter}
              columns={requirementHeader}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              checkboxSelection={props.selection}
              onRowClick={(params, event) => {
                if (props.isEditable) {
                  props.openEditRequirement(event, params.row);
                }
              }}
              onSelectionModelChange={(rows) => {
                console.log("onSelectionModelChange: ", rows);
                setSelectedRequirements(rows);
                props.handleCheckBoxClicked(rows);
              }}
              selectionModel={selectedRequirements}
            />
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
          isEditable={false}
          selection={true}
          requirementTypeArray={props.requirementTypeArray}
          handleCheckBoxClicked={props.handleCheckBoxClicked}
        />
      </CustomizedDialogs>
    </>
  );
};
