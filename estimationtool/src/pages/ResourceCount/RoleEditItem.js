import React, { useState, useEffect } from "react";
import ResourceCountService from "./resourcecount.service";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Snackbar from "../../shared/layout/snackbar/Snackbar";

const RoleEditItem = (props) => {
  console.log("role edit props", props);
  const [isOpen, setOpen] = React.useState({});
  const [disabledState, setDisabledState] = useState(false);

  const [value, setValue] = React.useState("");
  const [helperText, setHelperText] = React.useState(
    "*Selected Role will be adjusted to remianing allocation"
  );

  const [roleData, setRoleData] = useState([]);
  const [adjustedTrueRole, setAdjustedTrueRole] = useState("");

  useEffect(() => {
    getResourceMasterRoleData(props.rowEditData._id);
  }, [props.rowEditData]);

  const getResourceMasterRoleData = async (resourceCountId) => {
    await ResourceCountService.getResourceMasterRole(resourceCountId)
      .then((res) => {
        let checkFlag = false;
        let id = "";
        res.data.body.map((el) => {
          checkFlag = el.defaultAdjusted;
          console.log("aaaaaaaaaaaaaaaa", checkFlag);
          if (checkFlag) {
            setAdjustedTrueRole(el._id);
          }
        });
        console.log("aaaa", res.data.body);
        console.log("aaaaa", id);
        console.log("aaaaaaaaaa", checkFlag);
        setRoleData(res.data.body);

        console.log("res1", res);
      })
      .catch((err) => {});
  };
  console.log("roleData", roleData);
  let obj = {
    defaultAdjusted: false,
    estHeaderId: props.rowEditData.estHeaderId,
    estResourceCountID: props.rowEditData._id,
    estAttributeId: props.rowEditData.estAttributeId || null,
    estCalcId: props.rowEditData.estCalcId || null,
    resourceRoleID: null, //e.target.id in function call
    qty: 0, // should be 1 or -1 for API success
  };

  const handleIncrementCount = (e) => {
    obj =
      e.target.id === value
        ? { ...obj, resourceRoleID: e.target.id, qty: 1, defaultAdjusted: true }
        : {
            ...obj,
            resourceRoleID: e.target.id,
            qty: 1,
            defaultAdjusted: false,
          };

    ResourceCountService.updateResourceRole(obj)
      .then((res) => {
        // setOpen({ open: true, severity: "success", message: res.data.message });
        props.handleEditChange();
        getResourceMasterRoleData(props.rowEditData._id);
      })
      .catch((err) => {
        if (!err.response.data.message) console.log(err);
        else {
          setDisabledState(true);
          setOpen({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
        }
      });
  };

  const handleDecrementCount = (e) => {
    obj =
      e.target.id === value
        ? {
            ...obj,
            resourceRoleID: e.target.id,
            qty: -1,
            defaultAdjusted: true,
          }
        : {
            ...obj,
            resourceRoleID: e.target.id,
            qty: -1,
            defaultAdjusted: false,
          };

    ResourceCountService.updateResourceRole(obj)
      .then((res) => {
        console.log(res);
        setDisabledState(false);

        // setOpen({ open: true, severity: "success", message: res.data.message });
        props.handleEditChange();
        getResourceMasterRoleData(props.rowEditData._id);
      })
      .catch((err) => {
        if (!err.response.data.message) console.log(err);
        else {
          setDisabledState(true);
          setOpen({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
        }
      });
  };

  const StyledFormControlLabel = styled((props) => (
    <FormControlLabel {...props} />
  ))(({ theme, checked }) => ({
    ".MuiFormControlLabel-label": checked && {
      color: "#61dafb",
    },
    ".css-vqmohf-MuiButtonBase-root-MuiRadio-root.Mui-checked": {
      color: "#61dafb !important",
    },
    ".css-vqmohf-MuiButtonBase-root-MuiRadio-root": {
      color: "#ffffff",
    },
  }));

  function MyFormControlLabel(prop) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
      checked = radioGroup.value === prop.value;
    }

    return <StyledFormControlLabel checked={checked} {...prop} />;
  }

  const handleRadioChange = (event) => {
    console.log(event.target.id);
    setValue(event.target.value);
    setHelperText(
      `*${event.target.id} will be adjusted to remianing allocation`
    );

    obj = {
      ...obj,
      resourceRoleID: event.target.value,
      qty: 0,
      defaultAdjusted: true,
    };

    ResourceCountService.updateResourceRole(obj)
      .then((res) => {
        console.log(res);
        setDisabledState(false);
        props.handleEditChange();
        getResourceMasterRoleData(props.rowEditData._id);
      })
      .catch((err) => {
        if (!err.response.data.message) console.log(err);
        else {
          setDisabledState(true);
          setOpen({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
        }
      });
  };

  const { message, severity, open } = isOpen || {};

  const handleClose = () => {
    setOpen({});
  };

  console.log("aaaaaaaaa", adjustedTrueRole);
  console.log("aaaaaaaaaaaaaaaaaa", roleData);

  return (
    <div className="roleitem">
      {roleData[0] !== undefined && (
        <RadioGroup
          name="use-radio-group"
          defaultValue={
            adjustedTrueRole === "" ? roleData[0]._id : adjustedTrueRole
          }
          onChange={handleRadioChange}
        >
          {roleData.map((item) => (
            <div className="roleitem_list">
              <MyFormControlLabel
                value={item._id}
                label={`${item.resourceRole} (${item.location.name})`}
                control={<Radio id={item.resourceRole} />}
              />
              <div className="optionbtn">
                <button id={item._id} onClick={(e) => handleDecrementCount(e)}>
                  -
                </button>
                <p id={item._id}>{item.count}</p>
                <button
                  id={item._id}
                  disabled={disabledState}
                  onClick={(e) => handleIncrementCount(e)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </RadioGroup>
      )}
      <p className="helpertext">{helperText}</p>
      {open && (
        <Snackbar
          isOpen={open}
          severity={severity}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />
      )}
    </div>
  );
};

export default RoleEditItem;
