import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import classes from "./UserRoleManagement.module.css";
import { Grid } from "@material-ui/core";
import userRoleManagementService from "./userRoleManagement.service";

const UserRoleListItem = (props) => {
  const handleRoleChange = async (e) => {
    await userRoleManagementService
      .updateUserRole(e.target.labels[0].id, e.target.value)
      .then((res) => {
        updateUserWithRoles(e.target.labels[0].id, e.target.value);
        // props.checkRefresh();
      });
  };

  const updateUserWithRoles = (clickedUserId, selectedRoleId) => {
    let newUserWithRoles = props.userWithRoles.map((el) => {
      if (el._id === clickedUserId) {
        el.roleId._id = selectedRoleId;
      }
      return el;
    });

    console.log(newUserWithRoles);

    props.setUserWithRoles(newUserWithRoles);
  };

  return (
    <>
      {props.userWithRoles.map((user) => {
        return (
          <BorderedContainer key={user._id}>
            <Grid container className={classes.userContainer}>
              <Grid item xs={4}>
                <h4>
                  {user.firstName} {user.lastName}
                </h4>
                <p className={classes.userEmail}>{user.email}</p>
              </Grid>
              <Grid iten xs={8} className={classes.userFourmRow}>
                <FormControl
                  component="fieldset"
                  className={classes.radioGroup}
                >
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    className={classes.radioGroup}
                  >
                    {props.roles.map((el) => {
                      return (
                        <FormControlLabel
                          value={el._id}
                          key={el._id}
                          id={user._id}
                          checked={el._id === user.roleId._id}
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
        );
      })}
    </>
  );
};

export default UserRoleListItem;
