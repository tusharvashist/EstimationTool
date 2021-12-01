import React, { useState } from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from "@material-ui/core/TextField";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import EstimationService from "../estimation-detail/estimation.service";
import Autocomplete from "@mui/material/Autocomplete";

const useStyles = makeStyles((theme) => ({
  formControl: { maxWidth: 400 },
}));

const EditCalAttributeDialog = (props) => {
  console.log(props + ">>>>>>>>>>>>>>>")
  const classes = useStyles();
  const [calcType, setCalcType] = useState("per");

  const [formData, setFormData] = React.useState({
    estTypeId: null,
    calcAttribute: " ",
    calcAttributeName: "",
    isFormula: true,
    formula: "%",
    operator: "abcd",
    unit: null,
    description: " ",
    tags: [""],
    calcType: "",
  });
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [showError, setShowError] = useState(false);
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  console.log(props + ">>>>>>>>>>>>>>>")
  const handelCalAttributeName = (e) => {
    let newObject = { ...formData };
    newObject.calcAttributeName = e.target.value;
    setFormData({ ...newObject });
  };
  const handleCalcType = (e) => {
    setCalcType(e.target.value);
    console.log(calcType);
  };
  const handleTag = (e) => {
    let newObject = { ...formData };
    newObject.calcType = e.target.value;
    setFormData({ ...newObject });
  };
  //===============================
  const getBasicDetailById = (calback) => {
    EstimationService.getById()
      .then((res) => {
        setRequirementTagArray([...res.data.body.requirementTag]);
        console.log("dataResponse.requirementTag");

        calback();
      })
      .catch((err) => {
        console.log("get EstimationService by id error", err);
      });
  };
  //=======

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

  const handleMultiSelect = (e) => {
    let newObject = { ...formData };
    newObject.tags = e.map((data) => {
      const arr = data.key;
      return arr;
    });
    setFormData({ ...newObject });
  };
  const removeDataMultiSelect = (e) => {
    formData.tags.pop(e.key);
  };

  const options = [
    { key: "Option 1", title: "Group 1" },
    { key: "Option 2", title: "Group 2" },
    { key: "Option 3", title: "Group 3" },
    { key: "Option 4", title: "Group 4" },
    { key: "Option 5", title: "Group 5" },
    { key: "Option 6", title: "Group 6" },
    { key: "Option 7", title: "Group 7" },
  ];

  const { calcAttributeName, unit } = formData;
  console.log("calctype", calcType);
  console.log("showError", showError);
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
          {/* <InputLabel htmlFor="Calculation Type">Calculation Type</InputLabel> */}
          <FormControl className={classes.formControl}>
            <InputLabel> Tag</InputLabel>
            <Select onChange={handleTag}>
              {/* <MenuItem value="man">Manual</MenuItem>
              <MenuItem value="per">Percentage</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel> Calculation Type</InputLabel>
            <Select onChange={handleCalcType} defaultValue="per">
              <MenuItem value="man">Manual</MenuItem>
              <MenuItem value="per">Formula</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {calcType == "per" ? (
          <Grid container direction="row" alignItems="center">
            <Grid item xs={3}>
              <TextField
                required
                error={showError && !unit}
                helperText={showError ? "Please enter only b/w 1-100" : ""}
                id="standard-basic"
                label="Value"
                className="full-width"
                onChange={handelFormula}
                variant="outlined"
                type="number"
                max={2}
                onKeyDown={(evt) =>
                  symbolsArr.includes(evt.key) && evt.preventDefault()
                }
                pattern="^[1-9][0-9]?$|^100$"
              />
            </Grid>
            <Grid item xs={2}>
              {" "}
              <label style={{ marginLeft: "30px" }}>% of</label>
            </Grid>
            <Grid item xs={7}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={options}
                getOptionLabel={(option) => option.title}
                defaultValue={[options[1]]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Tags"
                    placeholder="Tags..."
                  />
                )}
              />
            </Grid>
            <p style={{ color: "green", fontSize: "12px" }}>
              Percentage will be applied on the sum of selected tag efforts{" "}
            </p>
          </Grid>
        ) : (
          <p style={{ color: "green", fontSize: "12px" }}>
            Please use Estimation Detail page to enter value manually{" "}
          </p>
        )}
      </Grid>
    </CustomizedDialogs>
  );
};

export default EditCalAttributeDialog;
