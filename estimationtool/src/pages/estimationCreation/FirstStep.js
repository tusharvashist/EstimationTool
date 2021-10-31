import {
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@material-ui/core";

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "./step.css";
import masterServices from "../masterservices/master.service"

import { useSelector, useDispatch } from 'react-redux'
import { setEstimationName,setEstimationType, setEstimationTypeId,setEfforUnit,setEsttimationDesc} from '../../Redux/basicDetailRedux'


const FirstStep = (props) => {
  const basicDetailRedux = useSelector((state) => state.basicDetail);
  const dispatch = useDispatch();
  const [characterCount, setCharacterCount] = useState(250);
  const [estTypes, setEstimationTypes] = useState([]);
  const [effortUnitTypes, setEffortUnitTypes] = useState([{key: 1,value: "Month"},{key: 2,value: "Day"},{key: 3,value:"Hour"}]);
  //const [selectedEstType, setSelectedEstimationType] = useState();
  //const [selectedEffortUnit, setSelectedEffortUnit] = useState();
  //const [estimationNameAutoGen, setEstimationNameAutoGen] = useState();
  const [clientName, setClientName] = useState();
  const [projectName, setProjectName] = useState();
  //const [estimationDescription, setEstimationDescription] = useState();
  //const { control } = useFormContext();



  useEffect(()=>{
    setClientName(props.clientName);
    setProjectName(props.projectName);
    getAllMasterEstimationTypes();
    remainingCharCount(basicDetailRedux.esttimationDesc);
  },[])

  // get all estimation types master list
  const getAllMasterEstimationTypes = () => {
    masterServices.getAllEstimationTypes()
      .then((res) => {
        let dataResponce = res.data.body;
        setEstimationTypes([...dataResponce]);
      })
      .catch((err) => {
        console.log("get master estimation types", err);
      });
  }; 
  
  // get the Estimation Type dropdown selected value
  const getEstimationDropDownValue = (event) => {
    //console.log("this is an selected value", event);
    let etId = event.target.value; //estimation type object
    //setSelectedEstimationType(etId);
    console.log("Selected ESTIMATION TYPE+"+ etId);
    generateEstimationName(etId);
    dispatch(setEstimationTypeId(etId));
    
  };
    //update the remaining character count limit
    const remainingCharCount = (charString) => {
      var remainingCharLimit = 250 - charString.length;
     setCharacterCount(remainingCharLimit);
     dispatch(setEsttimationDesc(charString));

 }

  //generate estimation Name
  const generateEstimationName = (etId) =>{
    const selectedEstimationObj = estTypes.find((esType) => esType.id === etId);
    var estName=selectedEstimationObj.estType+"-"+clientName+"-"+projectName;
    //return estName.replace(/ /g,"_");
    //setEstimationNameAutoGen(estName.replace(/ /g,"_"));
    dispatch(setEstimationType(selectedEstimationObj.estType));
    dispatch(setEstimationName(estName.replace(/ /g,"_")));

  }

  // get the Effort Unit value from selected dropdown
  const getEffortUnitDropDownValue = (event) => {
    //console.log("this is an selected value", event);
    let effortUnit = event.target.value; //effort unit type object
    //setSelectedEffortUnit(effortUnit);
    console.log("Selected EffortUnit+"+ effortUnit);
    dispatch(setEfforUnit(effortUnit));

  };

  return (
    <React.Fragment>
      <BorderedContainer className="no-shadow">
        <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <div className="field-width">
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Estimation Type*
                </InputLabel>
      
                <Select
                  labelId="estimation-type-label"
                  id="estimation-type-select"
                  onChange={(e) => {
                  console.log(e.target.value+"Instade est select onchange")
                  getEstimationDropDownValue(e)}
                 }
                 value={basicDetailRedux.estimationTypeId}

                
                >
                  {estTypes.map((item) => (
                     <MenuItem key={item.estType} value={item.id}>
                        {item.estType} 
                     </MenuItem>  
                  ))} 
                </Select>
                
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="field-width">
              <FormControl>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Effort Unit*
                </InputLabel>

                <Select
                    labelId="effort-unit-label"
                    id="effort-unit-select"
                    onChange={getEffortUnitDropDownValue}
                    value={basicDetailRedux.efforUnit}
                  >
                   {effortUnitTypes.map((item) => (
                       <MenuItem value={item.value}>
                         {item.value}
                       </MenuItem>  
                    ))} 
                  </Select>
                
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={5}>
          
          <TextField
              id="standard-basic"
              label=""
              variant="outlined"
              value={basicDetailRedux.estimationName}
            />
            
          </Grid>
        </Grid>
        <Grid item xs={8} spacing={1}>

        <TextField
            id="standard-basic"
            label="Description*"
            variant="standard"
            multiline={true}
            rows={3}
            maxRows={3}
            value={basicDetailRedux.esttimationDesc}
            onChange={(e) => remainingCharCount(e.target.value)}
            variant="outlined"
            inputProps={{ maxLength: 250 }}
          />
          <div><p>Remaining character limit: {characterCount}</p></div>
        </Grid>
      </BorderedContainer>
    </React.Fragment>
  );
};

export default FirstStep;
