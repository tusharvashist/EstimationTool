import React from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

const EstimationAssumptionsDialog = (props) => {
  const popSubmitHandler = () => {};
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <CustomizedDialogs
      isOpen={props.isOpen}
      openFun={props.openImportAssumptionsPopup}
      closeFun={props.closeImportAssumptionsPopup}
      title={props.title}
      oktitle={props.oktitle}
      cancelTitle={props.cancelTitle}
      saveFun={popSubmitHandler}
      width={"sm"}
      buttonType="submit"
    >
      <div>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Assumptions</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={gilad}
                  onChange={handleChange}
                  name="gilad"
                />
              }
              label="Gilad Gray"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={jason}
                  onChange={handleChange}
                  name="jason"
                />
              }
              label="Jason Killian"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={antoine}
                  onChange={handleChange}
                  name="antoine"
                />
              }
              label="Antoine Llorca"
            />
          </FormGroup>
          <FormHelperText>
            Please click "save" to add assumption in estimation. Once estimation
            is released assumptions will not be changed
          </FormHelperText>
        </FormControl>
      </div>
    </CustomizedDialogs>
  );
};

export default EstimationAssumptionsDialog;
