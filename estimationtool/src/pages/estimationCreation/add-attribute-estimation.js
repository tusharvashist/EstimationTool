import React from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";

export default function AddAttributeEstimations(props) {
  const [formData, setFormData] = React.useState({
    attributeCode: "DEV",
    attributeName: "",
    description: "name",
  });
  const [showError, setShowError] = React.useState(false);

  const handelAttributeName = (e) => {
      let newObject = { ...formData };
      newObject.attributeName = e.target.value;
      setFormData({ ...newObject });
    },
    onSubmitForm = (e) => {
      if (formData.attributeName) {
        setShowError(false);
        props.saveFun({ ...formData });
      } else {
        setShowError(true);
      }
    };

  const { attributeName } = formData;
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
          <form onSubmit={onSubmitForm}>
            <TextField
              required
              error={showError && !attributeName}
              autoFocus
              id="standard-basic"
              label="Attribute Name"
              className="full-width"
              onChange={handelAttributeName}
              variant="outlined"
            />
          </form>
        </Grid>
      </Grid>
    </CustomizedDialogs>
  );
}
