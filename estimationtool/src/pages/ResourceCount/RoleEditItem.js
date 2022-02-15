import React, { useState, useEffect } from "react";
import ResourceCountService from "./resourcecount.service";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Snackbar from "../../shared/layout/snackbar/Snackbar";

const RoleEditItem = (props) => {
  console.log("edit", props);
  const [isOpen, setOpen] = React.useState({});
  const [disabledState, setDisabledState] = useState(false);

  const [value, setValue] = React.useState(false);
  const [helperText, setHelperText] = React.useState(
    "*Selected Role will be adjusted to remianing allocation"
  );

  const [roleData, setRoleData] = useState([]);
  const [adjustedTrueRole, setAdjustedTrueRole] = useState("");

  useEffect(() => {
    // getResourceMasterRoleData(props.rowEditData._id);
    setResourceCountData();
  }, [props]);

  const setResourceCountData = () => {
    let id = "";
    let check = false;
    props.rowEditData.rolecount.forEach((el, i) => {
      if (el.defaultAdjusted) {
        setAdjustedTrueRole(el._id);
        check = true;
      }
    });
    if (!check) {
      props.rowEditData.rolecount[0].defaultAdjusted = true;
      setAdjustedTrueRole(props.rowEditData.rolecount[0]._id);
    }
    console.log("edit this");
    setRoleData(props.rowEditData.rolecount);
  };

  const getResourceMasterRoleData = async (resourceCountId) => {
    await ResourceCountService.getResourceMasterRole(resourceCountId)
      .then((res) => {
        let id = "";
        let check = false;
        res.data.body.forEach((el, i) => {
          if (el.defaultAdjusted) {
            console.log("ccccc", "true", i);
            setAdjustedTrueRole(el._id);
            check = true;
          }
        });
        if (!check) {
          res.data.body[0].defaultAdjusted = true;
          setAdjustedTrueRole(res.data.body[0]._id);
        }
        setRoleData(res.data.body);
        console.log("res1", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      e.target.id === adjustedTrueRole
        ? { ...obj, resourceRoleID: e.target.id, qty: 1, defaultAdjusted: true }
        : {
            ...obj,
            resourceRoleID: e.target.id,
            qty: 1,
            defaultAdjusted: false,
          };

    ResourceCountService.updateResourceRole(obj)
      .then(() => {
        ResourceCountService.getResourceRoleCountOnUpdate(props.rowEditData._id)
          .then((countRes) => {
            props.handleEditChange(countRes.data.body, props.rowEditData._id);
          })
          .catch((error) => {
            console.log(error);
          });
        // getResourceMasterRoleData(props.rowEditData._id);
        // setValue(!value);
      })
      .catch((err) => {
        if (err.response === undefined) console.log(err);
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
      e.target.id === adjustedTrueRole
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
      .then(() => {
        setDisabledState(false);
        ResourceCountService.getResourceRoleCountOnUpdate(props.rowEditData._id)
          .then((countRes) => {
            props.handleEditChange(countRes.data.body, props.rowEditData._id);
          })
          .catch((error) => {
            console.log(error);
          });
        // getResourceMasterRoleData(props.rowEditData._id);
        // setValue(!value);
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

  const StyledFormControlLabel = styled((styleProp) => (
    <FormControlLabel {...styleProp} />
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
    setAdjustedTrueRole(event.target.value);
    setHelperText(
      `*${event.target.id} will be adjusted to remianing allocation`
    );

    obj = {
      ...obj,
      resourceRoleID: event.target.value,
      qty: 0,
      defaultAdjusted: true,
    };
    roleData.forEach((el) => {
      if (el._id === event.target.value) {
        if (el.count > 0) {
          updateAdjustingFlag();
        }
      }
    });
    function updateAdjustingFlag() {
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
    }
  };

  const { message, severity, open } = isOpen || {};

  const handleClose = () => {
    setOpen({});
  };

  return (
    <div className="roleitem">
      {roleData[0] !== undefined && (
        <RadioGroup
          name="use-radio-group"
          defaultValue={adjustedTrueRole}
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
