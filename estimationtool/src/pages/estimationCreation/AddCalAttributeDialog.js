import React, { useState } from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

const AddCalAttributeDialog = (props) => {
  const [showError, setShowError] = useState(false);
  const [calAttributeName, setCalAttributeName] = useState("");

  const handelCalAttributeName = (e) => {
    setCalAttributeName(e.target.value);
  };

  const onSubmitForm = (e) => {
    console.log(e);
    setShowError(false);
  };

  return (
    <CustomizedDialogs
      isOpen={props.isOpen}
      openFun={props.openF}
      closeFun={props.closeF}
      title={props.title}
      oktitle={props.oktitle}
      cancelTitle={props.cancelTitle}
      saveFun={onSubmitForm}
    >
      <Grid container>
        <form onSubmit={onSubmitForm}>
          <TextField
            required
            error={showError && !calAttributeName}
            autoFocus
            id="standard-basic"
            label={props.title}
            className="full-width"
            onChange={handelCalAttributeName}
          />
        </form>
      </Grid>
    </CustomizedDialogs>
  );
};

export default AddCalAttributeDialog;
