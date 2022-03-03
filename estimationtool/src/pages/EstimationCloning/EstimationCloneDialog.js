import React, { useState, useEffect } from "react";
import CustomizedDialogsBlank from "../../shared/ui-view/dailog/dailog-blank";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import EstimationService from "../estimation-detail/EstimationService";
import { useDispatch } from "react-redux";
import { setEstHeaderId } from "../../Redux/estimationHeaderId";
import Snackbar from "../../shared/layout/snackbar/Snackbar";

const EstimationCloneDialog = (props) => {
  const dispatch = useDispatch();

  const [isOpen, setOpen] = React.useState({});
  const [estName, setEstName] = useState("");

  let name = props.estimationName;

  useEffect(() => {
    setEstName(props.estimationName);
  }, [name]);

  const handleNameChange = (e) => {
    setEstName(e.target.value);
  };

  const handleClose = () => {
    setOpen({});
  };

  const handleSave = async () => {
    await EstimationService.cloneEstimation(props.estimationId, estName)
      .then((res) => {
        dispatch(setEstHeaderId(res.data.body._id));
        props.closeFun();
        props.handleCloneSuccess(res);
      })
      .catch((err) => {
        console.log("_______", err);
        setOpen({
          open: true,
          severity: "error",
          message: "Sorry! Not able to clone",
        });
      });
  };

  const { message, severity, open } = isOpen || {};

  return (
    <CustomizedDialogsBlank
      isOpen={props.isOpen}
      openFun={props.openFun}
      closeFun={props.closeFun}
      title={props.title}
      oktitle={props.oktitle}
      cancelTitle={props.cancelTitle}
      saveFun={handleSave}
    >
      <Grid container>
        <TextField
          required
          error={estName.length === 0 ? true : false}
          variant="outlined"
          id="outlined-required"
          label="Estimation Name"
          value={estName}
          defaultValue={props.estimationName}
          onChange={handleNameChange}
          helperText="Please provide unique estimation name"
        />
      </Grid>
      <Snackbar
        isOpen={open}
        severity={severity}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </CustomizedDialogsBlank>
  );
};

export default EstimationCloneDialog;
