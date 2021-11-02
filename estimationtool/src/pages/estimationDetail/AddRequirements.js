import React, { useState } from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from "@material-ui/core/TextField";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const AddRequirements = (props) => {
  const [showError, setShowError] = useState(false);

  const onSubmitForm = (e) => {};

  const handelRequirement = () => {};

  const handelDescription = () => {};

  const handleRequirementGroupChange = () => {};

  const handleRequirementTypeChange = () => {};

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
      <Grid container spacing={2}>
        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel id="requirement-group">Requirement Group</InputLabel>
            <Select
              labelId="requirement-group"
              id="requirement-group"
              value="10"
              label="Requirement Group"
              onChange={handleRequirementGroupChange}
              required
            >
              <MenuItem value={10}>Requirement Gathering</MenuItem>
              <MenuItem value={20}>Development</MenuItem>
              <MenuItem value={30}>UAT</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel id="requirement-type">Requirement Type</InputLabel>
            <Select
              labelId="requirement-type"
              id="requirement-type"
              value="10"
              label="Requirement Type"
              onChange={handleRequirementTypeChange}
              required
            >
              <MenuItem value={10}>Epic</MenuItem>
              <MenuItem value={20}>Feature</MenuItem>
              <MenuItem value={30}>Story</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12}>
          <TextField
            required
            error={showError}
            autoFocus
            id="standard-basic"
            label="Requirement"
            className="full-width"
            onChange={handelRequirement}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={showError}
            id="standard-basic"
            label="Description"
            className="full-width"
            onChange={handelDescription}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </CustomizedDialogs>
  );
};

export default AddRequirements;
