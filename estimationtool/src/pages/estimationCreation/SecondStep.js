import {
  Button,
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
import Snackbar from "../../shared/layout/snackbar/Snackbar";

import { useSelector, useDispatch } from 'react-redux'
import { setEstAttributeId, setEstHeaderId } from '../../Redux/effortAttributeSaveRedux'



const SecondStep = (props) => {

  useEffect(() => {
    getAttribute()
  }, []);

  const saveAttribute = useSelector((state) => state.effortAttribute);
  const dispatch = useDispatch();

  const [checkboxValues, setCheckboxValues] = useState(null);
  const [attributes, setAttributes] = useState([]);

  const [finalIds, setFinalIds] = useState([]);
  const [isOpen, setOpen] = React.useState({});

  console.log("props", props)

  const getAttribute = () => {
    SecondStepServ.getAllAttribute(props.estimationTypeId, props.estimationHeaderId).then((res) => {
      let dataResponse = res.data.body;
      let checkboxValues = {}
      setAttributes(dataResponse.map(ob => {
        checkboxValues[ob.attributeName] = ob.selected;
        console.log("")
        return ({ ...ob, name: ob.attributeName, label: ob.attributeName })
      }));

      setCheckboxValues(checkboxValues)
    }).catch((err) => {
      console.log("Not getting Attribute", err)
    })
  }


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
      console.log("response", res)
      setOpen({ open: true, severity: 'success', message: res.data.message });
      getAttribute()
      closeDialog()
    }).catch((err) => {
    });
  }

  const updateCheckboxes = ({ checkConfig, data: { name, checked } }) => {

    const updatedValues = attributes.map((obj) => {
      if (obj._id === checkConfig._id) {
        const newobj = { ...obj, selected: checked }
        return newobj;
      } else {
        return obj;
      }
    })
    console.log("updatedValues", updatedValues)
    setAttributes(updatedValues)
    setFinalIds(updatedValues.map((ob) => ({ estAttributeId: ob._id, estHeaderId: props.estimatioHeaderId, selected: ob.selected })).filter(ob => ob.selected))
    
    dispatch(setEstAttributeId("6177d49fb6e42413fe1baf18"));
    dispatch(setEstHeaderId(props.estimatioHeaderId))

    console.log("attributeid",saveAttribute.estAttributeId)
  }

  const handleClose = () => {
    setOpen({})
  }
  console.log("finalIds", finalIds)
  const { message, severity, open } = isOpen || {}
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
            }} onChangeField={updateCheckboxes} />
          )}
        </FormControl>
      </BorderedContainer>
      {open && (
        <Snackbar
          isOpen={open}
          severity={severity}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />

      )}
    </React.Fragment>
  );
};

export default SecondStep;
