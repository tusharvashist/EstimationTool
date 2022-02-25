import React from "react";
import { RiPencilLine } from "react-icons/ri";
import classes from "./applicationAssumptions.module.css";

const AssumuptionList = (props) => {
  return (
    <>
      {props.assumptions.map((singleAssumption) => (
        <div className="assumption-container">
          <Grid container spacing={2}>
            <Grid item xs={7} className={classes.gridItem}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={singleAssumption.assumption}
                disabled
              />
            </Grid>
            <Grid item xs={3} className={classes.gridItem}>
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  value={singleAssumption.assumptionTag.id}
                  onChange={handleCategoryChange}
                  disabled
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
        </div>
      ))}
      ;
    </>
  );
};

export default AssumuptionList;
