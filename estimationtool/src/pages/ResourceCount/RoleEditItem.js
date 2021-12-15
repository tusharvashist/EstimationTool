import React, { useState, useEffect } from "react";
import ResourceCountService from "./resourcecount.service";
import Snackbar from "../../shared/layout/snackbar/Snackbar";

const RoleEditItem = (props) => {
  // useEffect(() => {
  //   setRerender(!render);
  // }, [props.rowEditData]);

  const [isOpen, setOpen] = React.useState({});
  const [disabledState, setDisabledState] = useState(false);

  const [rowRoleData, setRowRoleData] = useState(props.rowEditData);

  console.log("edit props", props);

  const handleIncrementCount = (e) => {
    let obj = {
      defaultAdjusted: false,
      estHeaderId: props.rowEditData.estHeaderId,
      estResourceCountID: props.rowEditData._id,
      estAttributeId: props.rowEditData.estAttributeId || null,
      estCalcId: props.rowEditData.estCalcId || null,
      resourceRoleID: e.target.id,
      qty: 1,
    };

    const setIncrementUpdateCount = () => {
      if (rowRoleData.rolecount.length == 0) {
        return [
          {
            count: 1,
            estAttributeId: props.rowEditData.estAttributeId || null,
            estCalcId: props.rowEditData.estCalcId || null,
            resourceRole: e.target.parentElement.previousSibling.innerText,
            resourceRoleID: e.target.id,
          },
        ];
      } else if (
        rowRoleData.rolecount.length == 1 &&
        rowRoleData.rolecount[0].resourceRoleID !== e.target.id
      ) {
        let newEl = [
          {
            count: 1,
            estAttributeId: props.rowEditData.estAttributeId || null,
            estCalcId: props.rowEditData.estCalcId || null,
            resourceRole: e.target.parentElement.previousSibling.innerText,
            resourceRoleID: e.target.id,
          },
        ];
        return [...rowRoleData.rolecount, ...newEl];
      } else {
        let roleCountArr = rowRoleData.rolecount.map((el) => {
          if (el.resourceRoleID === e.target.id) {
            let newCount = (el.count += 1);
            return { ...el, count: newCount };
          } else {
            return { ...el };
          }
        });
        return roleCountArr;
      }
    };

    ResourceCountService.updateResourceRole(obj)
      .then((res) => {
        console.log(res);

        setRowRoleData({
          ...rowRoleData,
          rolecount: setIncrementUpdateCount(),
        });
        setOpen({ open: true, severity: "success", message: res.data.message });
        props.handleEditChange();
      })
      .catch((err) => {
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history1.push(url);
        // }
        console.log("error", err);
        setDisabledState(true);
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  const handleClose = () => {
    setOpen({});
  };

  const handleDecrementCount = (e) => {
    let obj = {
      defaultAdjusted: false,
      estHeaderId: props.rowEditData.estHeaderId,
      estResourceCountID: props.rowEditData._id,
      estAttributeId: props.rowEditData.estAttributeId || null,
      estCalcId: props.rowEditData.estCalcId || null,
      resourceRoleID: e.target.id,
      qty: -1,
    };
    const setDecrementUpdateCount = () => {
      let roleCountArr = rowRoleData.rolecount.map((el) => {
        if (el.resourceRoleID === e.target.id) {
          let newCount = (el.count -= 1);
          return { ...el, count: newCount };
        } else {
          return { ...el };
        }
      });
      return roleCountArr;
    };
    ResourceCountService.updateResourceRole(obj)
      .then((res) => {
        console.log(res);
        setDisabledState(false);
        setRowRoleData({
          ...rowRoleData,
          rolecount: setDecrementUpdateCount(),
        });
        setOpen({ open: true, severity: "success", message: res.data.message });
        props.handleEditChange();
      })
      .catch((err) => {
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history1.push(url);
        // }

        setDisabledState(true);
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  const countProvider = (id, roleArr) => {
    if (roleArr.length === 0) {
      return 0;
    } else {
      let countVal = rowRoleData.rolecount.find((el) => {
        if (el.resourceRoleID === id) {
          return el;
        } else {
          return;
        }
      });
      return countVal === undefined ? 0 : countVal.count;
    }
  };

  const { message, severity, open } = isOpen || {};

  console.log("rowRoleData", rowRoleData);

  return (
    <div className="roleitem">
      {props.masterData.map((item) => (
        <div className="roleitem_list">
          <p>{item.resourceRole}</p>
          <div className="optionbtn">
            <button id={item._id} onClick={handleDecrementCount}>
              -
            </button>
            <p id={item._id}>
              {countProvider(item._id, rowRoleData.rolecount)}
            </p>
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
