import React from "react";
import { RiPencilLine } from "react-icons/ri";
import classes from "./applicationAssumptions.module.css";
import { Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@material-ui/core/Button";
import { GrAdd } from "react-icons/gr";
import { useState } from "react";

const AssumuptionList = (props) => {
  const [editState, setEditState] = useState(false);
  const [clickId, setClickId] = useState("");

  const handleEditClick = (e) => {
    setClickId(e.currentTarget.id);
    setEditState(true);
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
                value={singleAssumption.assumption}
                disabled={clickId === singleAssumption.id ? false : true}
              />
            </Grid>
            <Grid item xs={3} className={classes.gridItem}>
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={singleAssumption.assumptionTag.id}
                  onChange={props.handleCategoryChange}
                  disabled={clickId === singleAssumption.id ? false : true}
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
                disabled={clickId === singleAssumption.id ? true : false}
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
                disabled={clickId === singleAssumption.id ? false : true}
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
