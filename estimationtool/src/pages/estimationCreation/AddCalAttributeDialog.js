import React, { useState, useEffect } from "react";
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
import EstimationService from "../estimationDetail/estimation.service";
import SecondStepServ from "../estimationCreation/SecStepService.service";
import Autocomplete from "@mui/material/Autocomplete";




const AddCalAttributeDialog = (props) => {
  const useStyles = makeStyles((theme) => ({
    formControl: { maxWidth: 400 },
  }));
  const classes = useStyles();
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [showError, setShowError] = useState(false);
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [multiselectOptions, setmultiselectOptions] = useState([]);
  const [selectTagValue, setSelectTagValue] = useState();
  const [multiTagValue, setMultiSelectTag] = useState();

  const [formData, setFormData] = React.useState({
    estTypeId: null,
    calcAttribute: " ",
    calcAttributeName: "",
    isFormula: true,
    formula: "%",
    operator: "abcd",
    unit: 1,
    description: " ",
    formulaTags: [""],
    calcType: "",
    tag: {},
  });

  useEffect(() => {
    getAllRequirementTags();
    setEditData()
  }, []);

  // API Calling
  const getAllRequirementTags = () => {
    SecondStepServ.getAllRequirementTag()
      .then((res) => {
        setRequirementTagArray(res.data.body);
        setmultiselectOptions(res.data.body);
      })
      .catch((err) => { });
  };


  // Set Edit Data

  const setEditData = () => {
    if (props.id) {
      console.log("props",props)

      setFormData({ ...formData, ...props.details })
         let obj = { ...props.details };
         const tagInfo = props.details.tag || {};
     obj.tag= {id:tagInfo._id, name:tagInfo.name}
     
      setSelectTagValue(obj.tag.id)
    let  objNew = { ...props.details };
    let filterArray = [];
    let arry = objNew.formulaTags.flat().map(item => {
      let ob = {
        id: item._id,
        name: item.name
      }
      filterArray.push(ob)
    });
    
  setMultiSelectTag(filterArray)
    }
  }
  

  // Submit form
  const onSubmitForm = (e) => {
    if (calcType == "percentage") {
      getValuePercentage()
    } else {
      getValueManual()
    }
  };

  // selecting value percentage

  const getValuePercentage = () => {
    if (formData.calcAttributeName && formData.unit && formData.tag && formData.calcType && formData.formulaTags.length !== 0) {
     console.log("formData in save func", formData)
      props.saveFun({ ...formData });
    } else {
      setShowError(true);
    }
  }

  //  selecting value manual

  const getValueManual = () => {
    if (formData.calcAttributeName && formData.tag && formData.calcType) {
      let newObject = { ...formData };
      newObject.unit = 1;
      newObject.formulaTags = [""];
      setFormData({ ...newObject });
      props.saveFun({ ...newObject });
    } else {
      setShowError(true)
    }
  }


  //  Handle Validation
  const handelFormula = (e) => {
    if (e.target.value > 99 || e.target.value < 0) {
      setShowError(true);
    } else {
      setShowError(false);
      let newObject = { ...formData };
      newObject.unit = e.target.value;
      setFormData({ ...newObject });
    }
  };

  const handleMultiSelect = (value) => {

    // let newObject = { ...formData };

    // newObject.formulaTags = value.map((data) => {
    //   const arr = data.id;
    //   return arr;
    // });
    console.log("value in mult", value)
    setMultiSelectTag(value)
    setFormData({ ...formData, formulaTags: [...value] });
  };


  const handelCalAttributeName = (e) => {
    let newObject = { ...formData };
    newObject.calcAttributeName = e.target.value;
    setFormData({ ...newObject });
  };

  const handleCalcType = (e) => {
    if (e.target.value !== '') {
      let newObject = { ...formData };
      newObject.calcType = e.target.value;
      setFormData({ ...newObject, unit: 0 });
    } else {
      setShowError(true)
    }
  };

  const handleTag = (e) => {
    if (e.target.value !== '') {
      const _id = e.target.value;
      const name= e.target.label;

      // let newObject = { ...formData };
      // newObject.tag = e.target.value;
      setFormData({ ...formData,tag: {_id, name} });
    } else {
      setShowError(true)
    }
  };
  const { calcAttributeName, unit, calcType, formulaTags, tag } = formData;

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
            value={calcAttributeName}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <InputLabel htmlFor="Calculation Type">Calculation Type</InputLabel> */}
          <FormControl className={classes.formControl}>
            <InputLabel> Tag</InputLabel>
            <Select
              error={showError && !tag}
              onChange={handleTag}
              value={formData.tag.id}
              label={formData.tag.name}
              defaultValue={selectTagValue}
              required
            >
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
            <InputLabel> Calculation Type</InputLabel>
            <Select onChange={handleCalcType} error={showError && !calcType} value={calcType}>
              <MenuItem value="manual">Manual</MenuItem>
              <MenuItem value="percentage">Percentage</MenuItem>
            </Select>
          </FormControl>

        </Grid>

        {calcType == "percentage" ? (<>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={3}>
              <TextField
                required
                error={showError && !unit}
                helperText={showError ? "Enter b/w 1-100" : ""}
                id="standard-basic"
                value={unit}
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
                options={multiselectOptions}
                getOptionLabel={(option) => option.name}
                onChange={(e, value) => handleMultiSelect(value)}
                defaultValue={multiTagValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    value={params.id}
                    label="Tags"
                    placeholder="Tags..."
                    required
                    error={showError && !formulaTags}
                    helperText={showError ? "Select one tag atleast" : ""}

                  />
                )}
              />
            </Grid>
            <p style={{ color: "green", fontSize: "12px" }}>
              Percentage will be applied on the sum of selected tag efforts{" "}
            </p>
          </Grid></>
        ) : (
          <p style={{ color: "green", fontSize: "12px" }}>
            Please use Estimation Detail page to enter value manually{" "}
          </p>
        )}
      </Grid>
    </CustomizedDialogs>
  );
};

export default AddCalAttributeDialog;
