import { Grid } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import TextField from "@mui/material/TextField";
import { GrAdd } from "react-icons/gr";
import { RiPencilLine } from "react-icons/ri";
import classes from "./applicationAssumptions.module.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@material-ui/core/Button";

const ApplicationAssumptions = () => {
  const [categories, setCategories] = React.useState([
    "Technology",
    "Inclusion",
    "Exclusion",
  ]);

  const handleCategoryChange = (event) => {
    setCategories(event.target.value);
  };

  return (
    <>
      <BorderedContainer>
        <Grid container spacing={2} className={classes.grid}>
          <Grid item xs={8} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3} className={classes.gridItem}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categories[0]}
                label="Categories"
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <MenuItem value={category}>{category}</MenuItem>
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
            <Button variant="outlined">
              <GrAdd />
            </Button>
          </Grid>
        </Grid>
      </BorderedContainer>
      <BorderedContainer>
        <Grid container spacing={2}>
          <Grid item xs={10} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            xs={1}
            className={classes.gridItem}
            justifyContent="center"
            alignItems="stretch"
          >
            <Button variant="outlined">
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
            <Button variant="outlined">
              <GrAdd />
            </Button>
          </Grid>
        </Grid>
      </BorderedContainer>
    </>
  );
};

export default withRouter(ApplicationAssumptions);
