import React, { useState } from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

const AddAttributeDialog = (props) => {
  const [showError, setShowError] = useState(false);
  const [AttributeName, setAttributeName] = useState("");

  const handelAttributeName = (e) => {
    setAttributeName(e.target.value);
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
            error={showError && !AttributeName}
            autoFocus
            id="standard-basic"
            label={props.title}
            className="full-width"
            onChange={handelAttributeName}
          />
        </form>
      </Grid>
    </CustomizedDialogs>
  );
};

export default AddAttributeDialog;
