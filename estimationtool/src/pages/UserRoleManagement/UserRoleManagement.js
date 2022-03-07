import { Grid } from "@material-ui/core";
import React from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import classes from "./UserRoleManagement.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const UserRoleManagement = () => {
  return (
    <>
      <Grid container className={classes.lableContainer}>
        <Grid item xs={5}></Grid>
        <Grid iten xs={7} className={classes.userRoles}>
          <div className={classes.roleName}>
            <p>Super Admin</p>
          </div>
          <div className={classes.roleName}>
            <p>Admin</p>
          </div>
          <div className={classes.roleName}>
            <p>Full Contributor</p>
          </div>
          <div className={classes.roleName}>
            <p>Basic Contributor</p>
          </div>
          <div className={classes.roleName}>
            <p>Full Reviewer</p>
          </div>
          <div className={classes.roleName}>
            <p>Basic Reviewer</p>
          </div>
          <div className={classes.roleName}>
            <p>Full Viewer</p>
          </div>
          <div className={classes.roleName}>
            <p>Basic Viewer</p>
          </div>
        </Grid>
      </Grid>
      <BorderedContainer>
        <Grid container className={classes.userContainer}>
          <Grid item xs={5}>
            <h3>User</h3>
            <p>Email Id</p>
          </Grid>
          <Grid iten xs={7} className={classes.userFourmRow}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Super Admin"
                  control={<Radio />}
                  label=""
                />
                <FormControlLabel value="Admin" control={<Radio />} label="" />
                <FormControlLabel
                  value="Contributor"
                  control={<Radio />}
                  label=""
                />
                <FormControlLabel value="Viewer" control={<Radio />} label="" />
                <FormControlLabel value="Viewer" control={<Radio />} label="" />
                <FormControlLabel value="Viewer" control={<Radio />} label="" />
                <FormControlLabel value="Viewer" control={<Radio />} label="" />
                <FormControlLabel value="Viewer" control={<Radio />} label="" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </BorderedContainer>
      <BorderedContainer>
        <Grid container className={classes.userContainer}>
          <Grid item xs={5}>
            <h3>User</h3>
            <p>Email Id</p>
          </Grid>
          <Grid iten xs={7} className={classes.userFourmRow}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Super Admin"
                  control={<Radio />}
                  label=""
                />
                <FormControlLabel value="Admin" control={<Radio />} label="" />
                <FormControlLabel
                  value="Contributor"
                  control={<Radio />}
                  label=""
                />
                <FormControlLabel value="Viewer" control={<Radio />} label="" />
                <FormControlLabel value="Viewer" control={<Radio />} label="" />
                <FormControlLabel value="Viewer" control={<Radio />} label="" />
                <FormControlLabel value="Viewer" control={<Radio />} label="" />
                <FormControlLabel value="Viewer" control={<Radio />} label="" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </BorderedContainer>
      <BorderedContainer>
        <Grid container className={classes.userContainer}>
          <Grid item xs={5}>
            <h3>User</h3>
            <p>Email Id</p>
          </Grid>
          <Grid iten xs={7} className={classes.userFourmRow}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Super Admin"
                  control={<Radio />}
                  label=""
                />
                <FormControlLabel value="Admin" control={<Radio />} label="" />
                <FormControlLabel
                  value="Full Contributor"
                  control={<Radio />}
                  label=""
                />
                <FormControlLabel
                  value="Basic Contributor"
                  control={<Radio />}
                  label=""
                />
                <FormControlLabel
                  value="Full Reviewer"
                  control={<Radio />}
                  label=""
                />
                <FormControlLabel
                  value="Basic Reviewer"
                  control={<Radio />}
                  label=""
                />
                <FormControlLabel
                  value="Full Viewer"
                  control={<Radio />}
                  label=""
                />
                <FormControlLabel
                  value="Basic Viewer"
                  control={<Radio />}
                  label=""
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </BorderedContainer>
    </>
  );
};

export default UserRoleManagement;
