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
import Checkboxes from "../../shared/layout/checkboxes/checkboxes";
import Snackbar from "../../shared/layout/snackbar/Snackbar";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setEstAttributeData } from "../../Redux/effortAttributeSaveRedux";
import useLoader from "../../shared/layout/hooks/useLoader";

const SecondStep = (props) => {
  const roleState = useSelector((state) => state.role);
  useEffect(() => {
    getAttribute();
  }, []);

  const saveAttribute = useSelector((state) => state.effortAttribute);
  const basicDetail = useSelector((state) => state.basicDetail);
  console.log("basicDetail", basicDetail);

  const dispatch = useDispatch();

  const [checkboxValues, setCheckboxValues] = useState(null);
  const [attributes, setAttributes] = useState(saveAttribute.data || []);

  const [finalIds, setFinalIds] = useState([]);
  const [isOpen, setOpen] = React.useState({});
  const [loaderComponent, setLoader] = useLoader();
  const history = useHistory();

  const getAttribute = () => {
    setLoader(true);
    SecondStepServ.getAllAttribute(
      props.estimationTypeId,
      localStorage.estimationHeaderId
    )
      .then((res) => {
        setLoader(false);

        let dataResponse = res.data.body;
        let checkboxValues = {};
        console.log("dataResponse", dataResponse);
        setAttributes(
          dataResponse.map((ob) => {
            checkboxValues[ob.attributeName] = ob.selected;
            console.log("");
            return { ...ob, name: ob.attributeName, label: ob.attributeName };
          })
        );

        setCheckboxValues(checkboxValues);
        const newData = dataResponse
          .filter((ob) => ob.selected)
          .map((ob) => ({
            estAttributeId: ob._id,
            estHeaderId: localStorage.estimationHeaderId,
          }));

        dispatch(setEstAttributeData(newData));
      })
      .catch((err) => {
        console.log("Not getting Attribute", err);
        if ((err.response.data = 401) || (err.response.data = 404)) {
          let url = "/login";
          history.push(url);
        }
      });
  };

  const [dialog, setDialog] = useState(false);

  const openDailog = () => {
    setDialog(true);
  },
    closeDialog = () => {
      setDialog(false);
    };

  const saveCreateAttribute = (data) => {
    createAttribute(data);
  };

  const createAttribute = (Data) => {
    setLoader(true);

    SecondStepServ.createAttribute(Data)
      .then((res) => {
        // console.log("response", res);
        setLoader(false);

        setOpen({ open: true, severity: "success", message: res.data.message });
        getAttribute();
        closeDialog();
      })
      .catch((err) => {
        if ((err.response.data = 401) || (err.response.data = 404)) {
          let url = "/login";
          history.push(url);
        }
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  const updateCheckboxes = ({ checkConfig, data: { name, checked } }) => {
    const updatedValues = attributes.map((obj) => {
      if (obj._id === checkConfig._id) {
        const newobj = { ...obj, selected: checked };
        return newobj;
      } else {
        return obj;
      }
    });
    console.log("updatedValues", updatedValues);
    setAttributes(updatedValues);
    const newData = updatedValues
      .filter((ob) => ob.selected)
      .map((ob) => ({
        estAttributeId: ob._id,
        estHeaderId: localStorage.estimationHeaderId,
      }));
    setFinalIds(newData);

    dispatch(setEstAttributeData(newData));

    console.log("attributeid", saveAttribute.estAttributeId);
  };

  const handleClose = () => {
    setOpen({});
  };
  console.log("finalIds", finalIds);
  const { message, severity, open } = isOpen || {};
  return (
    <React.Fragment>
      {dialog && (
        <AddAttributeEstimation
          isOpen={dialog}
          openF={openDailog}
          closeF={closeDialog}
          title="Add New Attribute"
          oktitle="Save"
          saveFun={saveCreateAttribute}
          cancelTitle="Cancel"
        />
      )}

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justify={"flex-end"}
      >
        <Grid item>
          <div className="field-width add-attribute-btn">
            {!roleState.isContributor && (
              <Button variant="outlined" onClick={openDailog}>
                {" "}
                <AddIcon /> Add Attribute
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
            <FormLabel component="legend">Effort Attribute</FormLabel>
            {checkboxValues && (
              <Checkboxes
                defaultValues={checkboxValues}
                config={attributes}
                className="-------el----------"
                onChange={(data) => {
                  setCheckboxValues(data);
                }}
                onChangeField={updateCheckboxes}
              />
            )}
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

export default SecondStep;
