import {
  Select,
  MenuItem,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "./step.css";
import AddIcon from "@material-ui/icons/Add";
import AddCalAttributeDialog from "./AddCalAttributeDialog";
import SecondStepServ from "../estimationCreation/SecStepService.service";
import Checkboxes from "../../shared/layout/checkboxes/checkboxes";
import Snackbar from "../../shared/layout/snackbar/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import { setCalcAttributeData } from "../../Redux/CalcAttributeRedux";
import useLoader from "../../shared/layout/hooks/useLoader";
import classes from "./thirdStepStyle.module.css";
import { useHistory } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";

const ThirdStep = (props) => {
  const roleState = useSelector((state) => state.role);
  const [loaderComponent, setLoader] = useLoader();
  const dispatch = useDispatch();
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);
  const [openModal, setOpenModal] = useState(null);
  const [details, setDetails] = useState({});
  const [attributes, setAttributes] = useState([]);
  const [isOpen, setOpen] = React.useState({});
  const [calAttriValues, setcalAttriValues] = useState(null);
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [multiselectOptions, setmultiselectOptions] = useState([]);

  useEffect(() => {
    getCalcAttribute();
    passHeaderId();
  }, []);

  // Common Request to Save calculate attribute and update data on change
  const updateStore = (list) => {
    const newList = list
      .filter((ob) => ob.selected)
      .map(
        ({
          calcAttribute,
          calcAttributeName,
          isFormula,
          formula,
          operator,
          unit,
          description,
          formulaTags,
          tag,
          calcType,
          _id,
        }) => ({
          estHeaderId: localStorage.estimationHeaderId,
          calcAttribute,
          calcAttributeName,
          isFormula,
          formula,
          operator,
          unit,
          description,
          formulaTags,
          tag,
          calcType,
          estCalcId: _id,
        })
      );
    dispatch(setCalcAttributeData(newList));
  };

  // On page load Get all estimation template calculate attribue
  const getCalcAttribute = () => {
    setLoader(true);
    getAllRequirementTags();

    SecondStepServ.getAllCalculativeAttribute(
      props.estimationTypeId,
      localStorage.estimationHeaderId
    )
      .then((res) => {
        setLoader(false);

        let dataResponse = res.data.body;

        let calAttriValue = {};
        setAttributes(
          dataResponse.map((ob) => {
            calAttriValue[ob.calcAttributeName] = ob.selected;
            return {
              ...ob,
              formulaTags: ob.formulaTags || [],
              name: ob.calcAttributeName,
              label: ob.calcAttributeName,
            };
          })
        );

        setcalAttriValues(calAttriValue);
        updateStore(dataResponse);
      })
      .catch((err) => {
        console.log("Not getting Attribute", err);
      });
  };

  // Get all tag data on page load
  const getAllRequirementTags = () => {
    SecondStepServ.getAllRequirementTag()
      .then((res) => {
        setRequirementTagArray(res.data.body);
        setmultiselectOptions(res.data.body);
      })
      .catch((err) => {
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  // For open and edit dialog box of Calculative Attribute
  const openAddCalAttribute = () => {
    openFun("Add");
  };

  const openFun = (type) => {
    if (type) setOpenModal({ open: true, type });
  };
  const closeFun = () => {
    setDetails({});
    setOpenModal(null);
  };
  const saveAddCalAttributeFun = (data) => {
    saveCalAttribute(data);
  };

  // Method to create and update calculative attribute
  const saveCalAttribute = (data) => {
    if (data._id === undefined) {
      let newObject = {
        ...data,
        formulaTags: data.formulaTags.map((el) => el.id),
        tag: data.tag ? data.tag._id : "",
      };
      newObject.estTypeId = props.estimationTypeId;
      createCalcAttribute(newObject);
    } else {
      updateCalcAttribute(data);
    }
  };

  //  For creating of calculative attribute
  const createCalcAttribute = (data) => {
    setLoader(true);
    SecondStepServ.createCalAttribute(data)
      .then((res) => {
        setLoader(false);
        setOpen({ open: true, severity: "success", message: res.data.message });
        getCalcAttribute();
        closeFun();
      })
      .catch((err) => {
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  //  For updating of calculative attribute

  const updateCalcAttribute = (data) => {
    let obj = data.tag;
    if (data.tag._id === undefined) {
      obj = multiselectOptions.find((x) => {
        if (x.id === data.tag) {
          return { ...x, _id: x.id };
        }
      });
    }

    let filterArray = [];
    data.formulaTags.map((item) => {
      let ob = {
        _id: item.id || item._id,
        name: item.name,
      };
      filterArray.push(ob);
    });

    // settting data on the same state where we store all data
    const newData = attributes.map((att) => {
      if (att._id === data._id) {
        return {
          ...data,
          tag: obj,
          formulaTags: filterArray,
          name: data.calcAttributeName,
          label: data.calcAttributeName,
        };
      } else {
        return { ...att };
      }
    });
    setAttributes(newData);
    updateStore(newData);
    closeFun();
  };
  const handleClose = () => {
    setOpen({});
  };

  // while editing the comment box and unit box
  const onChangeField =
    ({ data }) =>
    ({ target }) => {
      setAttributes(
        attributes.map((obj) => {
          if (obj._id === data._id) {
            const newobj = { ...obj, [target.name]: target.value };
            return newobj;
          } else {
            return obj;
          }
        })
      );
      const newData = attributes.map((obj) => {
        if (obj._id === data._id) {
          return { ...obj, [target.name]: target.value };
        } else {
          return obj;
        }
      });
      setAttributes(newData);
      updateStore(newData);
    };

  // while check or uncheck checkbox
  const updateCheckboxes = ({ checkConfig, data: { name, checked } }) => {
    const newData = attributes.map((obj) => {
      if (obj._id === checkConfig._id) {
        return { ...obj, selected: checked };
      } else {
        return obj;
      }
    });
    setAttributes(newData);
    updateStore(newData);
  };

  // Destructing of snackbar
  const { message, severity, open } = isOpen || {};

  const passHeaderId = () => {
    props.getHeaderId(localStorage.estimationHeaderId);
  };

  const openEditCalBox = (data) => {
    setDetails(data);
    openFun("Edit");
  };

  return (
    <React.Fragment>
      {openModal && openModal.open ? (
        <AddCalAttributeDialog
          isOpen={openModal.open}
          id={details._id}
          details={details}
          openF={openFun}
          closeF={closeFun}
          title={`${openModal.type} Calculated Attributes`}
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
            {!roleState.isContributor && (
              <Button variant="outlined" onClick={openAddCalAttribute}>
                {" "}
                <AddIcon /> Add Calculated Attribute
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
      <BorderedContainer>
        {loaderComponent ? (
          loaderComponent
        ) : (
          <FormControl sx={{ m: 6 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Calculated Attributes </FormLabel>

            <FormGroup className="cal-attribute">
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
                        <div
                          title={
                            !data.selected
                              ? "Please mark it checked to edit the row"
                              : ""
                          }
                          className={classes.fields}
                          onClick={() => {
                            if (data.selected) {
                              openEditCalBox(data);
                            }
                          }}
                        >
                          <Select
                            style={{ minWidth: "180px" }}
                            placeholder="Tag"
                            disabled
                            //defaultValue={data.tag}
                            //value={data.tag}
                            //label={requirementTagArray.name}
                            value={data.tag ? data.tag._id : ""}
                            required
                          >
                            {requirementTagArray.map((item) => (
                              <MenuItem key={item.name} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {data.calcType !== "manual" ? (
                            <>
                              <TextField
                                className={classes.percent}
                                style={{ minWidth: "60px" }}
                                disabled
                                name="unit"
                                type={"number"}
                                min={1}
                                max={99}
                                label="%"
                                variant="outlined"
                                value={data.unit}
                                onChange={onChangeField({ data })}
                                onKeyDown={(evt) =>
                                  symbolsArr.includes(evt.key) &&
                                  evt.preventDefault()
                                }
                                // pattern="\b([0-9]|[1-9][0-9])\b"
                              />

                              <p className={classes.pof}>% of</p>
                              <Autocomplete
                                className={classes.chips}
                                disabled
                                limitTags={3}
                                multiple
                                id="tags-standard"
                                options={multiselectOptions}
                                getOptionLabel={(option) => option.name}
                                value={data.formulaTags}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    value={params.id}
                                    variant="standard"
                                    label="Formula Tags"
                                  />
                                )}
                              />
                            </>
                          ) : (
                            <TextField
                              disabled
                              className="text-box"
                              label="Manual"
                              variant="outlined"
                            />
                          )}
                        </div>
                        <TextField
                          style={{ maxWidth: "200px" }}
                          focused
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
            </FormGroup>
          </FormControl>
        )}
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
