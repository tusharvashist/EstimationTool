import React, { useState, useEffect } from "react";
import CustomizedDialogs from "../../shared/ui-view/dailog/dailog";
import TextField from "@material-ui/core/TextField";
import { Select, MenuItem, FormControl, InputLabel, makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import EstimationService from "../estimationDetail/estimation.service";
import { Multiselect } from "multiselect-react-dropdown";
import { fontSize } from "@material-ui/system";
// import { getAllRequirementTag } from "../../../../backend/service/requirementTagService";
import SecondStepServ from "../estimationCreation/SecStepService.service";
const useStyles = makeStyles(theme => ({
  formControl: { maxWidth: 400 }

}));




const AddCalAttributeDialog = (props) => {
  useEffect(() => {
    getAllRequirementTags()
  }, []);
  const getAllRequirementTags = () => {
    SecondStepServ.getAllRequirementTag().then((res) => {
      console.log(res.data)
      setRequirementTagArray(res.data.body);
      setmultiselectOptions(res.data.body)
    }).catch((err) => {

    })
  }
  const classes = useStyles()
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
    formulaTags: [""],
    calcType: "",
    tag: ""
  });
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [showError, setShowError] = useState(false);
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [multiselectOptions, setmultiselectOptions] = useState([]);

  const handelCalAttributeName = (e) => {
    let newObject = { ...formData };
    newObject.calcAttributeName = e.target.value;
    setFormData({ ...newObject });
  };
  const handleCalcType = e => {
    let newObject = { ...formData };
    newObject.calcType = e.target.value;
    setFormData({ ...newObject });
  }
  const handleTag = e => {
    let newObject = { ...formData };
    newObject.tag = e.target.value;
    setFormData({ ...newObject });

  }
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
    newObject.formulaTags = e.map((data) => { const arr = data.id; return arr });
    setFormData({ ...newObject });
  }
  const removeDataMultiSelect = (e) => {

    formData.formulaTags.pop(e.key)

  }
  const options = [
    { key: "Option 1", cat: "Group 1" },
    { key: "Option 2", cat: "Group 1" },
    { key: "Option 3", cat: "Group 1" },
    { key: "Option 4", cat: "Group 2" },
    { key: "Option 5", cat: "Group 2" },
    { key: "Option 6", cat: "Group 2" },
    { key: "Option 7", cat: "Group 2" }
  ]

  const { calcAttributeName, unit } = formData;
  console.log("calctype", calcType)
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
          {/* <InputLabel htmlFor="Calculation Type">Calculation Type</InputLabel> */}
          <FormControl className={classes.formControl}>
            <InputLabel > Tag</InputLabel>
            <Select onChange={handleTag} value={requirementTagArray.id}
              label={requirementTagArray.name}
              defaultValue={requirementTagArray[0]} >
              {requirementTagArray.map((item) => (
                <MenuItem key={item.name} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel > Calculation Type</InputLabel>
            <Select onChange={handleCalcType} >
              <MenuItem value="man">Manual</MenuItem>
              <MenuItem value="per">Percentage</MenuItem>

            </Select>
          </FormControl>


        </Grid>

        {calcType == "per" ?
          <>
            <Grid item xs={3}>
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
            <Grid item xs={2} > <label style={{ marginLeft: "30px" }}>% of</label></Grid>
            <Grid item xs={7}>
              <Multiselect
                options={multiselectOptions}
                closeIcon="close"
                displayValue="name"
                label="Tags"
                onSelect={handleMultiSelect}
                onRemove={removeDataMultiSelect}

              />
            </Grid>
            <p style={{ color: "green", fontSize: "12px" }}>Percentage will be applied on the sum of selected tag efforts </p>
          </>
          : <p style={{ color: "green", fontSize: "12px" }}>Please use Estimation Detail page to enter value manually </p>}
      </Grid>
    </CustomizedDialogs>
  );
};

export default AddCalAttributeDialog;
