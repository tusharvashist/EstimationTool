import React from "react";
import ResourceCountService from "./resourcecount.service";

const RoleEditItem = (props) => {
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
    ResourceCountService.updateResourceRole(obj);
    props.handleEditChange();
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
    ResourceCountService.updateResourceRole(obj);
    props.handleEditChange();
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

  return (
    <div className="roleitem">
      {props.masterData.map((item) => (
        <div className="roleitem_list">
          <p>{item.resourceRole}</p>
          <div className="optionbtn">
            <button onClick={handleIncrementCount}>+</button>
            <p id={item._id}>
              {countProvider(item._id, props.rowEditData.rolecount)}
            </p>
            <button onClick={handleDecrementCount}>-</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleEditItem;
