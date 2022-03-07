import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import classes from "./UserRoleManagement.module.css";
import userRoleManagementService from "./userRoleManagement.service";
import UserRoleListItem from "./UserRoleListItem";

const UserRoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [userWithRoles, setUserWithRoles] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getAllRoles();
    getAllUserWithRoles();
  }, [refresh]);

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

  const checkRefresh = () => {
    setRefresh(!refresh);
  };

  const getAllUserWithRoles = async () => {
    await userRoleManagementService
      .getAllUserWithRoles()
      .then((res) => {
        setUserWithRoles(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("user role", userWithRoles);

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
      <UserRoleListItem
        roles={roles}
        userWithRoles={userWithRoles}
        setUserWithRoles={setUserWithRoles}
        checkRefresh={checkRefresh}
      />
    </>
  );
};

export default UserRoleManagement;
