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
import Checkboxes from "../../shared/layout/checkboxes/checkboxes";
import { setEstimationTypeId } from "../../Redux/basicDetailRedux";
import Snackbar from "../../shared/layout/snackbar/Snackbar";

import { useSelector, useDispatch } from "react-redux";
import { setCalcAttributeData } from "../../Redux/CalcAttributeRedux";

const ThirdStep = (props) => {
  const saveCalcAttribute = useSelector((state) => state.calcAttribute);

  const dispatch = useDispatch();

  useEffect(() => {
    getCalcAttribute();
    passHeaderId();
  }, []);

  const updateStore = (list) => {
    const newList = list.map(
      ({
        calcAttribute,
        calcAttributeName,
        isFormula,
        formula,
        operator,
        unit,
        description,
      }) => ({
        estHeaderId: localStorage.estimationHeaderId,
        calcAttribute,
        calcAttributeName,
        isFormula,
        formula,
        operator,
        unit,
        description,
      })
    );
    dispatch(setCalcAttributeData(newList));
  }

  const getCalcAttribute = () => {
    SecondStepServ.getAllCalculativeAttribute(props.estimationTypeId, localStorage.estimationHeaderId)
      .then((res) => {
        let dataResponse = res.data.body;
        console.log(dataResponse);
        setAllCalcValues(dataResponse)
        let calAttriValues = {};
        setAttributes(
          dataResponse.map((ob) => {
            calAttriValues[ob.calcAttributeName] = ob.selected;
            return {
              ...ob,
              name: ob.calcAttributeName,
              label: ob.calcAttributeName,
            };
          })
        );
        setcalAttriValues(calAttriValues);
        updateStore(dataResponse);
      })
      .catch((err) => {
        console.log("Not getting Attribute", err);
      });
  };

  const [openAddCalAttributeBox, setOpenAddCalAttributeBox] = useState(false);

  const [attributes, setAttributes] = useState([]);

  const [isOpen, setOpen] = React.useState({});
  const [calAttriValues, setcalAttriValues] = useState(null);
  const [allCalcValues, setAllCalcValues] = useState([]);
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
    let newObject = { ...data };

    newObject.estTypeId = props.estimationTypeId;
    SecondStepServ.createCalAttribute(newObject).then((res) => {
      console.log("Calculative Attribute Created", res);
      setOpen({ open: true, severity: "success", message: res.data.message });
      getCalcAttribute();
      closeFun();
    });
  };

  const handleClose = () => {
    setOpen({});
  };

  const onChangeField =
    ({ data }) =>
      ({ target }) => {
        // console.log("data, target", data, target, attributes)

        const newData = attributes.map((obj) => {
          if (obj._id === data._id) {
            const newobj = { ...obj, [target.name]: target.value };
            return newobj;
          } else {
            return obj;
          }
        })
        setAttributes(newData);
        updateStore(newData);
      };
  const updateCheckboxes = ({ checkConfig, data: { name, checked } }) => {
    const newData = attributes.map((obj) => {
      if (obj._id === checkConfig._id) {
        const newobj = { ...obj, selected: checked };
        return newobj;
      } else {
        return obj;
      }
    })
    setAttributes(newData);
    updateStore(newData);
  };

  const { message, severity, open } = isOpen || {};
  // console.log("props", props);
  // console.log(
  //   "saveCalcAttribute",
  //   attributes.map(
  //     ({
  //       calcAttribute,
  //       calcAttributeName,
  //       isFormula,
  //       formula,
  //       operator,
  //       unit,
  //       description,
  //     }) => ({
  //       estHeaderId: localStorage.estimationHeaderId,
  //       calcAttribute,
  //       calcAttributeName,
  //       isFormula,
  //       formula,
  //       operator,
  //       unit,
  //       description,
  //     })
  //   )
  // );

  console.log("saveCalcAttribute", saveCalcAttribute)
  const passHeaderId = () => {
    props.getHeaderId(localStorage.estimationHeaderId);
  };

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

          <FormGroup>
            <FormControlLabel
              className="form"
              control={
                <>
                  {calAttriValues && (
                    <Checkboxes
                      defaultValues={calAttriValues}
                      config={attributes}
                      onChange={(data) => {
                        setcalAttriValues(data);
                      }}
                      onChangeField={updateCheckboxes}
                      customComponent={({ data }) => {
                        return (
                          <>
                            <TextField
                              name="unit"
                              type={"number"}
                              min={1}
                              max={99}
                              className="text-box"
                              label="%"
                              variant="outlined"
                              value={data.unit}
                              onChange={onChangeField({ data })}
                            />
                            <TextField
                              name="description"
                              className="comment-box"
                              label="Comment"
                              variant="outlined"
                              value={data.description}
                              onChange={onChangeField({ data })}
                            />
                          </>
                        );
                      }}
                    />
                  )}
                </>
              }
            />
          </FormGroup>
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

export default ThirdStep;
