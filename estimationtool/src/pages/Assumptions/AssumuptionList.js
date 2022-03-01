import React, { useState } from "react";
import { RiPencilLine } from "react-icons/ri";
import classes from "./applicationAssumptions.module.css";
import { Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@material-ui/core/Button";
import { GrAdd } from "react-icons/gr";
import assumptionService from "./assumpion.service";

const AssumuptionList = (props) => {
  const [editState, setEditState] = useState(false);
  const [clickAssumptionId, setClickAssumptionId] = useState("");

  const [editAssumptionName, setEditAssumptionName] = useState("");
  const [editAssumptionTag, setEditAssumptionTag] = useState("");

  const handleEditClick = (e) => {
    setClickAssumptionId(e.currentTarget.id);
    let assumption = props.assumptions.find(
      (el) => el.id === e.currentTarget.id
    );
    setEditAssumptionName(assumption.assumption);
    setEditAssumptionTag(assumption.assumptionTag.id);
    setEditState(true);
  };

  const handleEditAssumptionName = (e) => {
    setEditAssumptionName(e.target.value);
  };

  const handleEditTagChange = (e) => {
    setEditAssumptionTag(e.target.value);
  };

  const submitEdittedAssumption = async () => {
    await assumptionService
      .updateAssumption(
        editAssumptionName,
        editAssumptionTag,
        clickAssumptionId
      )
      .then(() => {
        setEditState(false);
        props.handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {props.assumptions.map((singleAssumption) => (
        <div key={singleAssumption.id} className="assumption-container">
          <Grid container spacing={2}>
            <Grid item xs={7} className={classes.gridItem}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={
                  clickAssumptionId === singleAssumption.id && editState
                    ? editAssumptionName
                    : singleAssumption.assumption
                }
                disabled={
                  clickAssumptionId === singleAssumption.id && editState
                    ? false
                    : true
                }
                onChange={handleEditAssumptionName}
              />
            </Grid>
            <Grid item xs={3} className={classes.gridItem}>
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={
                    clickAssumptionId === singleAssumption.id && editState
                      ? editAssumptionTag
                      : singleAssumption.assumptionTag.id
                  }
                  onChange={handleEditTagChange}
                  disabled={
                    clickAssumptionId === singleAssumption.id && editState
                      ? false
                      : true
                  }
                >
                  {props.categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={1}
              className={classes.gridItem}
              justifyContent="center"
              alignItems="stretch"
            >
              <Button
                variant="outlined"
                onClick={handleEditClick}
                id={singleAssumption.id}
                ass={singleAssumption.assumption}
                disabled={
                  clickAssumptionId === singleAssumption.id && editState
                    ? true
                    : false
                }
              >
                <RiPencilLine />
              </Button>
            </Grid>
            <Grid
              item
              className={classes.gridItem}
              xs={1}
              justifyContent="center"
              alignItems="stretch"
            >
              <Button
                variant="outlined"
                disabled={
                  clickAssumptionId === singleAssumption.id && editState
                    ? false
                    : true
                }
                onClick={submitEdittedAssumption}
              >
                <GrAdd />
              </Button>
            </Grid>
          </Grid>
        </div>
      ))}
    </>
  );
};

export default AssumuptionList;
