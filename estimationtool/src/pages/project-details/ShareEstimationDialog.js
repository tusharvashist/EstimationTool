import React, { useState, useEffect } from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ShareEstimateDialogService from "./ShareEstimateDialogService";

import Snackbar from "../../shared/layout/snackbar/Snackbar";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

const ShareEstimationDialog = (props) => {
  const [selectedEstimation, setSelectedEstimation] = useState();
  const [roleMasterList, setRoleMasterList] = useState();
  const [userList, setUserList] = useState([]);
  const [selectedUserList, setSelectedUserList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [timer, setTimer] = useState([]);
  const [isOpen, setOpen] = React.useState({});
  const { message, severity, open } = isOpen || {};

  useEffect(() => {
    setSelectedEstimation(props.selectedEstimation);
    getRole();
  }, [props.selectedEstimation]);

  const handleChange = (e) => {
    if (timer !== null) {
      clearTimeout(timer);
      setUserList([]);
    }
    setSearchKeyword(e.target.value);
    setTimer(
      setTimeout(() => {
        getPCUserDetails();
      }, WAIT_INTERVAL)
    );
  };

  const getPCUserDetails = () => {
    ShareEstimateDialogService.getPCUserDetails(searchKeyword)
      .then((res) => {
        let roleList = res.data.body;
        setUserList(roleList);
        //   setRoleMasterList(roleList);
        //    console.log("get Client by id error", roleList);
      })
      .catch((err) => {
        console.log("get Client by id error", err);
      });
  };

  const getRole = () => {
    ShareEstimateDialogService.getRole()
      .then((res) => {
        let roleList = res.data.body;
        setRoleMasterList(roleList);
        console.log("get Client by id error", roleList);
      })
      .catch((err) => {
        console.log("get Client by id error", err);
      });
  };

  console.log("selectedEstimation : ", selectedEstimation);

  const handleChipClick = () => {};

  const handleChipDelete = (item) => {
    var temp = selectedEstimation;
    setSelectedEstimation(temp.filter((el) => el.id !== item.id));
    if (selectedEstimation.length === 1) {
      props.closeF();
    }
  };

  const [roles, setRoles] = React.useState();
  const handleRoleChange = (event) => {
    setRoles(event.target.value);
  };

  const handleShareClick = (event) => {
    var estimationId = [];
    selectedEstimation.forEach((item) => {
      //{"id":"61eacd1ad063cf60c2b8523a"},
      estimationId.push({ id: item._id });
    });

    if (estimationId.length === 0) {
      setOpen({
        open: true,
        severity: "error",
        message: "Add least one estimate before sharing.",
      });
    } else if (roles === undefined) {
      setOpen({
        open: true,
        severity: "error",
        message: "Select user role before sharing.",
      });
    } else if (selectedUserList.length === 0) {
      setOpen({
        open: true,
        severity: "error",
        message: "Add least one user before sharing.",
      });
    } else {
      var requestJson = {
        Estimations: estimationId,
        RoleId: roles,
        Users: selectedUserList,
      };

      console.log("requestJson : ", requestJson);
      ShareEstimateDialogService.share(requestJson)
        .then((res) => {
          let status = res.data.status;
          console.log("get Client by id error", status);
          if (status === 200) {
            setRoles(undefined);
            setSelectedUserList([]);
            props.saveFun(res);
          } else {
            setOpen({
              open: true,
              severity: "error",
              message: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log("get Client by id error", err);
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogClose = () => {
    setRoles(undefined);
    setSelectedUserList([]);
    props.closeF();
  };
  return (
    <CustomizedDialogs
      isOpen={props.isOpen}
      openFun={props.openF}
      closeFun={handleDialogClose}
      title={props.title}
      oktitle={props.oktitle}
      cancelTitle={props.cancelTitle}
      saveFun={handleShareClick}
    >
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            Selected Estimations
          </Grid>
          <Grid item xs={12}>
            {selectedEstimation !== undefined
              ? selectedEstimation.map((item) => {
                  return (
                    <Chip
                      label={item.estName}
                      variant="outlined"
                      onClick={handleChipClick}
                      onDelete={() => {
                        handleChipDelete(item);
                      }}
                    />
                  );
                })
              : ""}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ maxWidth: 260 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Estimation Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={roles}
                label="Estimation Role"
                onChange={(e) => {
                  handleRoleChange(e);
                }}
              >
                {roleMasterList !== undefined
                  ? roleMasterList.map((item) => {
                      return (
                        <MenuItem value={item._id}>{item.roleName}</MenuItem>
                      );
                    })
                  : ""}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={userList}
            getOptionLabel={(option) =>
              option.EmpFName +
              " " +
              option.EmpLName +
              " (" +
              option.vc_Email +
              ")"
            }
            filterSelectedOptions
            onChange={(e, value) => {
              console.log("e:", e, " v:", value);
              setSelectedUserList(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search User by Name"
                placeholder="User Name"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            )}
          />
        </Grid>
      </Grid>
      {open && (
        <Snackbar
          isOpen={open}
          severity={severity}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />
      )}
    </CustomizedDialogs>
  );
};

export default ShareEstimationDialog;
