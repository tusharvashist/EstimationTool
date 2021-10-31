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
import AddCalAttributeDialog from "./AddCalAttributeDialog";
import SecondStepServ from "../estimationCreation/SecStepService.service";
import Checkboxes from '../../shared/layout/checkboxes/checkboxes';
const ThirdStep = () => {

  useEffect(() => {
    getCalcAttribute()
  }, []);

  const getCalcAttribute = () => {
    SecondStepServ.getAllCalculativeAttribute().then((res) => {
      let dataResponse = res.data.body;
      console.log(dataResponse)

      let calAttriValues = {}
      setAttributes(dataResponse.map(ob => {
        calAttriValues[ob.calcAttributeName] = false;
        return ({ ...ob, name: ob.calcAttributeName, label: ob.calcAttributeName, defaultChecked: ob.isFormula, })
      }));

      setcalAttriValues(calAttriValues)
    }).catch((err) => {
      console.log("Not getting Attribute", err)
    })
  }

  const [openAddCalAttributeBox, setOpenAddCalAttributeBox] = useState(false);

  const [attributes, setAttributes] = useState([]);


  const [calAttriValues, setcalAttriValues] = useState(null);

  const openAddCalAttribute = () => {
    openFun();
  };

  const openFun = () => {
    setOpenAddCalAttributeBox(true);
  };
  const closeFun = () => {
    setOpenAddCalAttributeBox(false);
  };
  const saveAddCalAttributeFun = (data) => {
    createCalAttribute(data);
  };

  const createCalAttribute = (data) => {

    SecondStepServ.createCalAttribute(data).then((res) => {
      console.log("Calculative Attribute Created", res);
      getCalcAttribute();
      closeFun()
    })
  }



  return (
    <React.Fragment>
      {openAddCalAttributeBox ? (
        <AddCalAttributeDialog
          isOpen={openAddCalAttributeBox}
          openF={openFun}
          closeF={closeFun}
          title="Add Cal Attribute"
          oktitle="Save"
          saveFun={saveAddCalAttributeFun}
          cancelTitle="Cancel"
        />
      ) : null}


      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justify={"flex-end"}
      >
        <Grid item>
          <div className="field-width add-attribute-btn">
            <Button variant="outlined" onClick={openAddCalAttribute}>
              {" "}
              <AddIcon /> Add Cal Attribute
            </Button>
          </div>
        </Grid>
      </Grid>
      <BorderedContainer>
        <FormControl sx={{ m: 6 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Calculated Attributes </FormLabel>

          <FormGroup className="">
            <FormControlLabel
              control={
                <>
                  {calAttriValues && (
                    <Checkboxes defaultValues={calAttriValues} config={attributes} onChange={(data) => {
                      setcalAttriValues(data);
                    }} customComponent={({ data }) => {

                      return (
                        <>
                          <TextField
                            type={"number"}
                            max={2}
                            className="text-box"
                            label="%"
                            variant="outlined"
                            value={data.unit}
                          />
                          <TextField
                            className="comment-box"
                            label="Comment"
                            variant="outlined"
                            value={data.description}
                          /></>

                      )
                    }
                    } />
                  )}

                </>
              }

            />
          </FormGroup>
        </FormControl>
      </BorderedContainer>
    </React.Fragment>
  );
};

export default ThirdStep;
