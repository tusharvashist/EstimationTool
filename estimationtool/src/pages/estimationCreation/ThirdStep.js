import {
  Select,
  MenuItem,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "./step.css";
import AddIcon from "@material-ui/icons/Add";
import AddCalAttributeDialog from "./AddCalAttributeDialog";
import EditCalAttributeDialog from "./EditCalAttributeDialog";
import SecondStepServ from "../estimationCreation/SecStepService.service";
import Checkboxes from "../../shared/layout/checkboxes/checkboxes";
import { setEstimationTypeId } from "../../Redux/basicDetailRedux";
import Snackbar from "../../shared/layout/snackbar/Snackbar";

import { useSelector, useDispatch } from "react-redux";
import { setCalcAttributeData } from "../../Redux/CalcAttributeRedux";
import useLoader from "../../shared/layout/hooks/useLoader";
import classes from "./thirdStepStyle.module.css";
import { useHistory } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";


const ThirdStep = (props) => {
  const roleState = useSelector((state) => state.role);
  const saveCalcAttribute = useSelector((state) => state.calcAttribute);
  const [loaderComponent, setLoader] = useLoader();
  const history = useHistory();
  const dispatch = useDispatch();
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);

  const [openModal, setOpenModal] = useState(null);
  const [details, setDetails] = useState({})

  const [attributes, setAttributes] = useState([]);

  const [isOpen, setOpen] = React.useState({});
  const [calAttriValues, setcalAttriValues] = useState(null);
  const [allCalcValues, setAllCalcValues] = useState([]);
  const [requirementTagArray, setRequirementTagArray] = useState([]);
  const [multiselectOptions, setmultiselectOptions] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [multiSelectData, setmultiSelectData] = useState([]);
  useEffect(() => {
    getCalcAttribute();
    passHeaderId();
    getAllRequirementTags();
  }, []);

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
          calcType
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
          calcType
        })
      );
    dispatch(setCalcAttributeData(newList));
  };

  const getCalcAttribute = () => {
    setLoader(true);
    SecondStepServ.getAllCalculativeAttribute(
      props.estimationTypeId,
      localStorage.estimationHeaderId
    )
      .then((res) => {
        setLoader(false);

        let dataResponse = res.data.body;
        setAllCalcValues(dataResponse);
     
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
        // let tagObj = {
        //   id: dataResponse.tag._id,
        //   name: dataResponse.tag.name
        // }
        // setTagData(tagObj)
        setcalAttriValues(calAttriValues);
        updateStore(dataResponse);
      })
      .catch((err) => {
        console.log("Not getting Attribute", err);
      });
  };


  console.log("attributes", attributes)
  const getAllRequirementTags = () => {
    SecondStepServ.getAllRequirementTag()
      .then((res) => {
        setRequirementTagArray(res.data.body);
        setmultiselectOptions(res.data.body);
      })
      .catch((err) => { });
  };

  const openAddCalAttribute = () => {
    openFun("Add");
  };

  const openFun = (type) => {
    if (type)
      setOpenModal({ open: true, type })
  };
  const closeFun = () => {
    setDetails({});
    setOpenModal(null);
  };
  const saveAddCalAttributeFun = (data) => {
    saveCalAttribute(data);
  };

  const saveCalAttribute = (data) => {

    if (data._id === undefined) {
      let newObject = { ...data };
      newObject.estTypeId = props.estimationTypeId;
      createCalcAttribute(newObject)
    } else {
      updateCalcAttribute(data)
    }
  };

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
  }

  const updateCalcAttribute = (data) => {

    console.log("updateddata", data)
    let tagObj = {
      id: data.tag._id,
      name: data.tag.name
    }
    setTagData(tagObj);
    let multiArray = [];
    if (data.formulaTags.length > 1) {
    let multiDataObj = data.formulaTags.map(item =>
      {
        let filter = {
          id:item
        }
        multiArray.push(filter)
      }
      )
      console.log("multiarray",multiArray)
      let setSelectedData = multiselectOptions.find(x => multiArray.map(req => req.id === x.id))
    setmultiSelectData(setSelectedData)
  } else {
    let obj = {
      id: data.formulaTags._id,
      name: data.formulaTags.name
    }
    setmultiSelectData(obj)
  }

    setAttributes(attributes.map((att) => {
      if (att._id === data._id) {
        return { ...data, name: data.calcAttributeName, label: data.calcAttributeName };
      } else {
        return { ...att }
      }
    }));
    closeFun();
  }
  const handleClose = () => {
    setOpen({});
  };

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
            const newobj = { ...obj, [target.name]: target.value };
            return newobj;
          } else {
            return obj;
          }
        });
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
    });
    setAttributes(newData);
    updateStore(newData);
  };

  const { message, severity, open } = isOpen || {};

  const passHeaderId = () => {
    props.getHeaderId(localStorage.estimationHeaderId);
  };


  const openEditCalBox = (data) => {
    setDetails(data)
    openFun('Edit');
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
                          className={classes.fields}
                          onClick={() => { openEditCalBox(data) }}
                        >

                          
                          <Select
                          placeholder="Tag"
                            disabled
                            defaultValue={tagData}
                            value={requirementTagArray.id}
                            label={requirementTagArray.name}
                            required
                          >
                            {requirementTagArray.map((item) => (
                              <MenuItem key={item.name} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>

                          <TextField
                            className={classes.percent}
                            style={{ minWidth: "80px" }}
                            disabled
                            name="unit"
                            type={"number"}
                            min={1}
                            max={99}
                            className="text-box"
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
                            multiple
                            id="tags-standard"
                            options={multiselectOptions}
                            getOptionLabel={(option) => option.name}
                            defaultValue={multiSelectData}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                value={params.id}
                                variant="standard"
                                label="Formula Tags"
                                placeholder="Formula Tags..."
                              />
                            )}
                          />
                        </div>
                        <TextField
                          style={{ maxWidth: "450px" }}
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
