import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import CustomizedDialogs from "../../../shared/ui-view/dailog/dailog";

export const ExportEstimation = (props) => {
  const [mixCheck, setMixCheck] = useState(false);
  const checkResourceMix = (e) => {
    setMixCheck(e.target.checked);
  };

  return (
    <FormControl component="fieldset" className="form-export">
      <FormLabel component="legend">
        Would you like to take estimation value:
      </FormLabel>
      <RadioGroup
        row
        aria-label="gender"
        name="row-radio-buttons-group"
        defaultValue="with Contingency"
      >
        <FormControlLabel
          value="with Contingency"
          control={<Radio />}
          label="with Contingency"
        />
        <FormControlLabel
          value="without Contingency"
          control={<Radio />}
          label="without Contingency"
        />
      </RadioGroup>
      <FormLabel component="legend">
        Please select from below options to export:
      </FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Estimation Requirement & Summary"
        />
        <FormControlLabel
          control={<Checkbox onChange={checkResourceMix} />}
          label="Resource Mix"
        />
        <RadioGroup
          style={{ padding: "0 20px" }}
          row
          aria-label="gender"
          name="row-radio-buttons-group"
          defaultValue="with Cost"
        >
          <FormControlLabel
            disabled={!mixCheck}
            value="with Contingency"
            control={<Radio />}
            label="with Cost"
          />
          <FormControlLabel
            disabled={!mixCheck}
            value="without Contingency"
            control={<Radio />}
            label="without Cost"
          />
        </RadioGroup>
        <FormControlLabel control={<Checkbox />} label="Resource Planning" />
        <FormControlLabel control={<Checkbox />} label="Resource Timeline" />
      </FormGroup>
    </FormControl>
  );
};

export const ExportEstimationPopup = (props) => {
  return (
    <>
      <CustomizedDialogs
        isOpen={props.openExport}
        openFun={props.openExportEstimation}
        closeFun={props.closeExportEstimation}
        title={props.title}
        oktitle={props.oktitle}
        cancelTitle={props.cancelTitle}
        saveFun={props.exportFun}
        width={"sm"}
      >
        <ExportEstimation />
      </CustomizedDialogs>
    </>
  );
};
