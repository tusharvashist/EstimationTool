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
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "./step.css";
import AddIcon from "@material-ui/icons/Add";
import AddAttributeEstimation from "../estimationCreation/add-attribute-estimation";
import SecondStepServ from "../estimationCreation/SecStepService.service";
import Checkboxes from '../../shared/layout/checkboxes/checkboxes';



const MOCK_CONFIG = [{ defaultChecked: true, label: 'first', name: 'first' }, { label: 'second', name: 'second' }, { label: 'third', name: 'third' }];

const SecondStep = () => {


  useEffect(() => {
    getAttribute()
  }, []);

  const [checkboxValues, setCheckboxValues] = useState(null);


  const getAttribute = () => {
    SecondStepServ.getAllAttribute().then((res) => {
      let dataResponse = res.data.body;
      console.log(dataResponse)

      let checkboxValues = {}
      setAttributes(dataResponse.map(ob => {
        checkboxValues[ob.attributeName] = ob.selected;
        console.log("")
        return ({ name: ob.attributeName, label: ob.attributeName })
      }));

      setCheckboxValues(checkboxValues)
    }).catch((err) => {
      console.log("Not getting Attribute", err)
    })
  }

  const [attributes, setAttributes] = useState([]);

  const [dialog, setDialog] = useState(false);

  const openDailog = () => {
    setDialog(true)
  },
    closeDialog = () => {
      setDialog(false)
    };


  const saveCreateAttribute = (data) => {
    createAttribute(data)
  }


  const createAttribute = (Data) => {
    SecondStepServ.createAttribute(Data).then((res) => {
      console.log("response", Data)
      getAttribute()
      closeDialog()
    }).catch((err) => {
    });
  }

  console.log("checkboxValues", checkboxValues)
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
         {checkboxValues && (
           <Checkboxes defaultValues={checkboxValues} config={attributes} onChange={(data) => {
            setCheckboxValues(data);
          }} />
         )} 
        </FormControl>
      </BorderedContainer>
    </React.Fragment>
  );
};

export default SecondStep;
