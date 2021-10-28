import React, { useState } from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Dropdown from "../../shared/ui-view/dropdown/dropdown";

const AddCalAttributeDialog = (props) => {
  const [showError, setShowError] = useState(false);
  const [calAttributeName, setCalAttributeName] = useState("");
  const calUnit = [
    {
      id: 1,
      title: "percentage",
    },
    {
      id: 2,
      title: "quantity",
    },
  ];

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
        <Grid item md={12}>
          <TextField
            required
            error={showError && !calAttributeName}
            autoFocus
            id="standard-basic"
            label="Calculated Attribute Name"
            className="full-width"
            onChange={handelCalAttributeName}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Dropdown
            defaultValue={{ title: "Active", value: "active" }}
            title="Calculation Unit"
            list={calUnit}
          />
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={onSubmitForm}>
            <TextField
              required
              error={showError && !calAttributeName}
              id="standard-basic"
              label="Formula"
              className="full-width"
              onChange={handelCalAttributeName}
              variant="outlined"
            />
          </form>
        </Grid>
      </Grid>
    </CustomizedDialogs>
  );
};

export default AddCalAttributeDialog;
