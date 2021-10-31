import React, { useState } from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Dropdown from "../../shared/ui-view/dropdown/dropdown";

const AddCalAttributeDialog = (props) => {

  const [formData, setFormData] = React.useState({

    estTypeId: "61764c1c51e16f30dc1f3ee5",
   
       calcAttribute: "345fghf",
   
       calcAttributeName: "",
   
       isFormula: true,
   
      formula: "%",
   
      operator: "abcd",
   
      unit: null,
   
       description: "abcd"
   
   });

  const [showError, setShowError] = useState(false);
 
  const handelCalAttributeName = (e) => {
    let newObject = { ...formData };
    newObject.calcAttributeName = e.target.value;
    setFormData({ ...newObject });
  };

  const onSubmitForm = (e) => {
    if (formData.calcAttributeName && formData.formula) {
      setShowError(false);
      props.saveFun({ ...formData });
    } else {
      setShowError(true);
    }
  };

  const handelFormula = (e) => {
    let newObject = { ...formData };
    newObject.unit = e.target.value;
    setFormData({ ...newObject });
  }



  const { calcAttributeName, unit} = formData;

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
              id="standard-basic"
              label="Formula"
              className="full-width"
              onChange={handelFormula}
              variant="outlined"
            />
        </Grid>
      </Grid>
    </CustomizedDialogs>
  );
};

export default AddCalAttributeDialog;
