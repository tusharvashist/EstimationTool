import React, { useState } from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

const AddCalAttributeDialog = (props) => {
  const [formData, setFormData] = React.useState({
    estTypeId: null,

    calcAttribute: " ",

    calcAttributeName: "",

    isFormula: true,

    formula: "%",

    operator: "abcd",

    unit: null,

    description: " ",
  });
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [showError, setShowError] = useState(false);

  const handelCalAttributeName = (e) => {
    let newObject = { ...formData };
    newObject.calcAttributeName = e.target.value;
    setFormData({ ...newObject });
  };

  const onSubmitForm = (e) => {
   
      if (formData.calcAttributeName && formData.formula) {
     
        props.saveFun({ ...formData });
      } else {
        setShowError(true);
      }
    
  };

  const handelFormula = (e) => {
    if (e.target.value > 99) {
      setShowError(true);
    } else {
      setShowError(false);
    let newObject = { ...formData };
    newObject.unit = e.target.value;
    setFormData({ ...newObject });
    }
  };

  const { calcAttributeName, unit } = formData;

  console.log("showError", showError)
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
            error={showError && !calcAttributeName}
            autoFocus
            id="standard-basic"
            label="Calculated Attribute Name"
            className="full-width"
            onChange={handelCalAttributeName}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          {/* <Dropdown
            title="Calculation Unit"
            value="percentage"
          /> */}
          <TextField
            id="standard-basic"
            label="Calculation Unit"
            className="full-width"
            variant="outlined"
            value="percentage"
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={showError && !unit}
            helperText={showError ? 'Please enter only b/w 1-100' : ''}
            id="standard-basic"
            label="Formula"
            className="full-width"
            onChange={handelFormula}
            variant="outlined"
            type="number"
            max={2}
            onKeyDown={(evt) => symbolsArr.includes(evt.key) && evt.preventDefault()}
            pattern="^[1-9][0-9]?$|^100$"
          />
        </Grid>
      </Grid>
    </CustomizedDialogs>
  );
};

export default AddCalAttributeDialog;
