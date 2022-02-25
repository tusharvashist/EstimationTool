import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import TextField from "@mui/material/TextField";
import { GrAdd } from "react-icons/gr";
import classes from "./applicationAssumptions.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@material-ui/core/Button";
import assumptionService from "./assumpion.service";
import Snackbar from "../../shared/layout/snackbar/Snackbar";
import AssumuptionList from "./AssumuptionList";

const ApplicationAssumptions = () => {
  useEffect(() => {
    importAllAssumptions();
    importAllAssumptionTags();
  }, []);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  const [assumptions, setAssumptions] = useState([]);

  const [assumptionInput, setAssumptionInput] = useState("");

  const [isOpen, setOpen] = React.useState({});

  const [assumptionInputError, setAssumptionInputError] = useState(false);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const importAllAssumptions = async () => {
    let result = await assumptionService.importAllAssumptions();
    setAssumptions(result.data.body);
  };

  const importAllAssumptionTags = async () => {
    let result = await assumptionService.importAllAssumptionTags();
    setCategories(result.data.body);
    setSelectedCategory(result.data.body[0].id);
  };

  const assumptionInputOnChange = (e) => {
    setAssumptionInput(e.target.value);
  };

  const onAssumptionSubmit = (e) => {
    e.preventDefault();
    if (assumptionInput.length > 0 && selectedCategory != {}) {
      assumptionService
        .addAssumption(assumptionInput, selectedCategory)
        .then(() => {
          importAllAssumptions();
          setAssumptionInput("");
          setSelectedCategory(categories[0]);
          setAssumptionInputError(false);
        });
    } else {
      setAssumptionInputError(true);
      setOpen({
        open: true,
        severity: "error",
        message: "Please enter assumption",
      });
    }
  };

  const handleClose = () => {
    setOpen({});
  };

  const { message, severity, open } = isOpen || {};

  return (
    <>
      <BorderedContainer>
        <Grid container spacing={2} className={classes.grid}>
          <Grid item xs={8} className={classes.gridItem}>
            <TextField
              id="outlined-basic-assumptionInput"
              focused={assumptionInputError}
              label="Outlined"
              variant="outlined"
              value={assumptionInput}
              onChange={assumptionInputOnChange}
            />
          </Grid>
          <Grid item xs={3} className={classes.gridItem}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCategory}
                label="Categories"
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            className={classes.gridItem}
            xs={1}
            justifyContent="center"
            alignItems="stretch"
          >
            <Button variant="outlined" onClick={onAssumptionSubmit}>
              <GrAdd />
            </Button>
          </Grid>
        </Grid>
      </BorderedContainer>
      <BorderedContainer>
        <AssumuptionList
          assumptions={assumptions}
          handleCategoryChange={handleCategoryChange}
          categories={categories}
        />
      </BorderedContainer>
      <Snackbar
        isOpen={open}
        severity={severity}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </>
  );
};

export default withRouter(ApplicationAssumptions);
