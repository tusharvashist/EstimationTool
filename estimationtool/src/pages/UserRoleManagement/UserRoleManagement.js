import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import classes from "./UserRoleManagement.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import userRoleManagementService from "./userRoleManagement.service";

const UserRoleManagement = () => {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    getAllRoles();
  }, []);

  const getAllRoles = async () => {
    await userRoleManagementService
      .getAllRoles()
      .then((res) => {
        setRoles(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRoleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <BorderedContainer>
        <Grid container className={classes.lableContainer}>
          <Grid item xs={4} className={classes.lableName}>
            <h3>Application Roles</h3>
          </Grid>
          <Grid iten xs={8} className={classes.userRoles}>
            {roles.map((el) => {
              return (
                <div className={classes.roleName}>
                  <p>{el.roleName}</p>
                </div>
              );
            })}
          </Grid>
        </Grid>
      </BorderedContainer>
      <BorderedContainer>
        <Grid container className={classes.userContainer}>
          <Grid item xs={4}>
            <h3>User Name</h3>
            <p>Email Id</p>
          </Grid>
          <Grid iten xs={8} className={classes.userFourmRow}>
            <FormControl component="fieldset" className={classes.radioGroup}>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                className={classes.radioGroup}
              >
                {roles.map((el) => {
                  return (
                    <FormControlLabel
                      value={el._id}
                      key={el._id}
                      id={el._id}
                      checked={false}
                      control={<Radio />}
                      label=""
                      onChange={handleRoleChange}
                      className={classes.centerRadio}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </BorderedContainer>
      <BorderedContainer>
        <Grid container className={classes.userContainer}>
          <Grid item xs={4}>
            <h3>User Name</h3>
            <p>Email Id</p>
          </Grid>
          <Grid iten xs={8} className={classes.userFourmRow}>
            <FormControl component="fieldset" className={classes.radioGroup}>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                className={classes.radioGroup}
              >
                <FormControlLabel
                  value="Super Admin"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Admin"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Contributor"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Full Viewer"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Basic Viewer"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Viewer"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Viewer"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Viewer"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </BorderedContainer>
      <BorderedContainer>
        <Grid container className={classes.userContainer}>
          <Grid item xs={4}>
            <h3>User Name</h3>
            <p>Email Id</p>
          </Grid>
          <Grid iten xs={8} className={classes.userFourmRow}>
            <FormControl component="fieldset" className={classes.radioGroup}>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                className={classes.radioGroup}
              >
                <FormControlLabel
                  value="Super Admin"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Admin"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Contributor"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Viewer"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Viewer"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Viewer"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Viewer"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
                />
                <FormControlLabel
                  value="Viewer"
                  control={<Radio />}
                  label=""
                  className={classes.centerRadio}
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
