import React, { useState, useEffect } from "react";
import CustomizedDialogsBlank from "../../shared/ui-view/dailog/dailog-blank";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import EstimationService from "../estimation-detail/EstimationService";
import { useDispatch } from "react-redux";
import { setEstHeaderId } from "../../Redux/estimationHeaderId";

const EstimationCloneDialog = (props) => {
  const dispatch = useDispatch();

  const [estName, setEstName] = useState("");

  let name = props.estimationName;

  useEffect(() => {
    setEstName(props.estimationName);
  }, [name]);

  const handleNameChange = (e) => {
    setEstName(e.target.value);
  };

  const handleSave = async () => {
    await EstimationService.cloneEstimation(props.estimationId, estName)
      .then((res) => {
        dispatch(setEstHeaderId(res.data.body._id));
        props.closeFun();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          variant="outlined"
          id="outlined-required"
          label="Estimation Name"
          value={estName}
          defaultValue={props.estimationName}
          onChange={handleNameChange}
          helperText="Please provide unique estimation name"
        />
      </Grid>
    </CustomizedDialogsBlank>
  );
};

export default EstimationCloneDialog;
