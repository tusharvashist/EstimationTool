import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  ListItem,
  NativeSelect,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "./step.css";
import AddIcon from "@material-ui/icons/Add";
import AddAttributeEstimation from "../estimationCreation/add-attribute-estimation";
import SecondStepServ from "../estimationCreation/SecStepService.service";
import Checkboxes from '../../shared/layout/checkboxes/checkboxes';


// useEffect(() => {
//   getAttribute()
// },[]);


const getAttribute = () => {
  SecondStepServ.getAllAttribute().then((res)=>{
let dataResponse = res.data.body;
console.log(dataResponse)
  }).catch((err)=>{
    console.log("Not getting Attribute",err)
  })
}

const MOCK_CONFIG = [{ defaultChecked: true, label: 'first', name: 'first' }, { label: 'second', name: 'second' }, { label: 'third', name: 'third' }];

const SecondStep = () => {
  const [checkboxValues, setCheckboxValues] = useState({});
  const [dialog, setDialog] = useState(false);

  const openDailog = () => {
    setDialog(true)
  },
    closeDialog = () => {
      setDialog(false)
    };


    const saveCreateAttribute = (data)=>{
      createAttribute(data)
    }


    const createAttribute = (Data)=>{
      SecondStepServ.createAttribute(Data).then((res)=>{
        console.log("response",Data)
        getAttribute()
        closeDialog()
      }).catch((err)=>{
      });
    } 

  return (
    <React.Fragment>
     {dialog &&
        (<AddAttributeEstimation
          isOpen={dialog}
          openF={openDailog}
          closeF={closeDialog}
          title="Add New Attribute"
          oktitle="Save"
          saveFun={saveCreateAttribute}
          cancelTitle="Cancel"
        />)}

      
      <BorderedContainer className="no-shadow">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <ListItem>Client Name: </ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>Client Website:</ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>Project Name:</ListItem>
          </Grid>
          <Grid item xs={6}>
            <ListItem>Business Domain:</ListItem>
          </Grid>
        </Grid>
      </BorderedContainer>
      <BorderedContainer className="no-shadow">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <div className="field-width">
              <FormControl fullWidth>
                <ListItem>Estimation Name:</ListItem>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="field-width">
              <FormControl fullWidth>
                <ListItem>Estimation Type:</ListItem>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={4}>
            <ListItem>Effort Unit:</ListItem>
          </Grid>
        </Grid>
      </BorderedContainer>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justify={"flex-end"}
      >
        <Grid item>
          <div className="field-width add-attribute-btn">
            <Button variant="outlined" onClick={openDailog}>
              {" "}
              <AddIcon /> Add Attribute
            </Button>
          </div>
        </Grid>
      </Grid>
      <BorderedContainer>
        <FormControl sx={{ m: 6 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Effort Attribute</FormLabel>
          <Checkboxes config={MOCK_CONFIG} onChange={(data) => {
            setCheckboxValues(data);
          }} />
        </FormControl>
      </BorderedContainer>
    </React.Fragment>
  );
};

export default SecondStep;
