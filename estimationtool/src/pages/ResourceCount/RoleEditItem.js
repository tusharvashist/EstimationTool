import React, { useState, useEffect } from "react";
import ResourceCountService from "./resourcecount.service";
import Snackbar from "../../shared/layout/snackbar/Snackbar";


const RoleEditItem = (props) => {
  const [isOpen, setOpen] = React.useState({});
  const [disabledState, setDisabledState] = useState(false);
  console.log("edit props", props);
  const handleIncrementCount = (e) => {
    // {
    //   "defaultAdjusted": false,
    //   "estResourceCountID":"61b06be54cf7ced54feba2fb", rowid
    //   "estAttributeId" :"61adad02beb92cc10fd2e68b",
    //   "estCalcId": null,
    //   "resourceRoleID" : "61ae02114fdff5af9831741e", sr. lead id
    //   "qty": -1
    //   }
    let obj = {
      defaultAdjusted: false,
      estHeaderId: props.rowEditData.estHeaderId,
      estResourceCountID: props.rowEditData._id,
      estAttributeId: props.rowEditData.estAttributeId || null,
      estCalcId: props.rowEditData.estCalcId || null,
      resourceRoleID: e.target.nextSibling.id,
      qty: 1,
    };
    ResourceCountService.updateResourceRole(obj).then((res) => {
      console.log(res)


      setOpen({ open: true, severity: "success", message: res.data.message });


    })
      .catch((err) => {
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history1.push(url);
        // }
        console.log(">>>>>>.hi>>>>>>>>", err)
        setDisabledState(true)
        setOpen({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });

    props.handleEditChange();
  };
  const handleClose = () => {
    setOpen({});
  };

  const handleDecrementCount = (e) => {
    console.log("edata", e);
    let obj = {
      defaultAdjusted: false,
      estHeaderId: props.rowEditData.estHeaderId,
      estResourceCountID: props.rowEditData._id,
      estAttributeId: props.rowEditData.estAttributeId || null,
      estCalcId: props.rowEditData.estCalcId || null,
      resourceRoleID: e.target.previousSibling.id,
      qty: -1,
    };
    props.handleEditChange();
    ResourceCountService.updateResourceRole(obj).then((res) => {
      console.log(res)


      setOpen({ open: true, severity: "success", message: res.data.message });


    })
      .catch((err) => {
        // if ((err.response.data = 401) || (err.response.data = 404)) {
        //   let url = "/login";
        //   history1.push(url);
        // }
        console.log(">>>>>>.hi>>>>>>>>", err)

        setDisabledState(true)
        setOpen({
          open: true,
          severity: "error",
          message: err.message,
        });
      });


  };

  const countProvider = (id, roleArr) => {
    if (roleArr.length === 0) {
      return 0;
    } else {
      let countVal = roleArr.find((el) => {
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
  return (
    <div className="roleitem">
      {props.masterData.map((item) => (
        <div className="roleitem_list">
          <p>{item.resourceRole}</p>
          <div className="optionbtn">
            <button disabled={disabledState} onClick={handleIncrementCount}>+</button>
            <p id={item._id}>
              {countProvider(item._id, props.rowEditData.rolecount)}
            </p>
            <button onClick={handleDecrementCount}>-</button>
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
