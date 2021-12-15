import React, { useState, useEffect } from "react";
import ResourceCountService from "./resourcecount.service";
import Snackbar from "../../shared/layout/snackbar/Snackbar";

const RoleEditItem = (props) => {
  const [isOpen, setOpen] = React.useState({});
  const [disabledState, setDisabledState] = useState(false);
  console.log("edit props", props);

  const [roleData, setRoleData] = useState([]);
  const [reloadEditCount, setReloadEditCount] = useState(false);

  useEffect(() => {
    getResourceMasterRoleData(props.rowEditData._id);
  }, [props.rowEditData, reloadEditCount]);

  const getResourceMasterRoleData = (resourceCountId) => {
    ResourceCountService.getResourceMasterRole(resourceCountId)
      .then((res) => {
        setRoleData(res.data.body);
      })
      .catch((err) => {});
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
    obj = { ...obj, resourceRoleID: e.target.id, qty: 1 };

    ResourceCountService.updateResourceRole(obj)
      .then((res) => {
        console.log("3res", res);

        // setOpen({ open: true, severity: "success", message: res.data.message });
        props.handleEditChange();
        setReloadEditCount(!reloadEditCount);
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
    obj = { ...obj, resourceRoleID: e.target.id, qty: -1 };
    ResourceCountService.updateResourceRole(obj)
      .then((res) => {
        console.log(res);
        setDisabledState(false);

        // setOpen({ open: true, severity: "success", message: res.data.message });
        props.handleEditChange();
        setReloadEditCount(!reloadEditCount);
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

  return (
    <div className="roleitem">
      {roleData.map((item) => (
        <div className="roleitem_list">
          <p>{item.resourceRole}</p>
          <div className="optionbtn">
            <button id={item._id} onClick={handleDecrementCount}>
              -
            </button>
            <p id={item._id}>{item.count}</p>
            <button
              id={item._id}
              disabled={disabledState}
              onClick={handleIncrementCount}
            >
              +
            </button>
          </div>
        </div>
      ))}
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
