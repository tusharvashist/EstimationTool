import React from "react";
import ResourceCountService from "./resourcecount.service";

const RoleEditItem = (props) => {
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
      estResourceCountID: props.rowEditData._id,
      estAttributeId: props.rowEditData.estAttributeId || null,
      estCalcId: props.rowEditData.estCalcId || null,
      resourceRoleID: e.target.previousSibling.id,
      qty: -1,
    };
    ResourceCountService.updateResourceRole(obj);
    props.handleEditChange();
  };

  const sumOfRoleCounts = (array) => {
    const newCount = array.reduce((prevEl, el) => {
      const found = prevEl.find((item) => item.roleId === el.roleId);

      if (!found) {
        prevEl.push(el);
      } else {
        found.count += 1;
      }
      return prevEl;
    }, []);
    return newCount;
  };

  const countProvider = (id, roleArr) => {
    if (roleArr[0].roleId === undefined) {
      return 0;
    } else {
      let allSumArr = sumOfRoleCounts(roleArr);
      console.log("allSumArr", allSumArr);
      const count = allSumArr.map((el) => {
        if (el.roleId === id) {
          return el.count;
        }
        return 0;
      });
      console.log("count", count[0]);
      return count[0];
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
