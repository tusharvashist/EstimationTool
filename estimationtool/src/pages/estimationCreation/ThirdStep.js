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

  useEffect(() => {
    getCalcAttribute();
    passHeaderId();
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
        setcalAttriValues(calAttriValues);
        updateStore(dataResponse);
      })
      .catch((err) => {
        console.log("Not getting Attribute", err);
      });
  };
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);

  const [openAddCalAttributeBox, setOpenAddCalAttributeBox] = useState(false);
  const [openEditCalAttributeBox, setOpenEditCalAttributeBox] = useState(false);

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
    setLoader(true);

    let newObject = { ...data };

    newObject.estTypeId = props.estimationTypeId;
    SecondStepServ.createCalAttribute(newObject)
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

  // const createProject = (projectData) => {
  //   ProjectSer.createProject(projectData)
  //     .then((res) => {
  //       getClientById();
  //       setOpen({ open: true, severity: "success", message: res.data.message });
  //       closeFun();
  //     })
  //     .catch((err) => {
  //       setOpen({ open: true, severity: "error", message: err.message });
  //     });
  // };

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

  const options = [
    { key: "Option 1", title: "Group 1" },
    { key: "Option 2", title: "Group 2" },
    { key: "Option 3", title: "Group 3" },
    { key: "Option 4", title: "Group 4" },
    { key: "Option 5", title: "Group 5" },
    { key: "Option 6", title: "Group 6" },
    { key: "Option 7", title: "Group 7" },
  ];

  const openEditCalBox = () => {
    openEditFun();
  };
  const openEditFun = () => {
    setOpenEditCalAttributeBox(true);
  };
  const closeEditFun = () => {
    setOpenEditCalAttributeBox(false);
  };

  return (
    <React.Fragment>
      {openAddCalAttributeBox ? (
        <AddCalAttributeDialog
          isOpen={openAddCalAttributeBox}
          openF={openFun}
          closeF={closeFun}
          title="Add Calculated Attributes"
          oktitle="Save"
          saveFun={saveAddCalAttributeFun}
          cancelTitle="Cancel"
        />
      ) : null}
      {openEditCalAttributeBox ? (
        <EditCalAttributeDialog
          isOpen={openEditCalAttributeBox}
          openF={openEditFun}
          closeF={closeEditFun}
          title="Edit Calculated Attributes"
          oktitle="Update"
          saveFun={saveAddCalAttributeFun} //Update
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
                          onClick={openEditCalBox}
                        >
                          <TextField
                            className={classes.attributeTag}
                            disabled
                            variant="outlined"
                            name="attribute"
                            value="Architect"
                          />
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
                            options={options}
                            getOptionLabel={(option) => option.title}
                            defaultValue={[options[1]]}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                label="Tags"
                                placeholder="Tags..."
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
