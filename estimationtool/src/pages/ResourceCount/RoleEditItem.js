import React from "react";
import ResourceCountService from "./resourcecount.service";

const RoleEditItem = (props) => {
  const handleIncrementCount = (e) => {
    console.log("id", e);
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
      qty: "1",
    };
    ResourceCountService.updateResourceRole(obj);
  };

  const handleDecrementCount = (e) => {};

  return (
    <div className="roleitem">
      {props.masterData.map((item) => (
        <div className="roleitem_list">
          <p>{item.resourceRole}</p>
          <div className="optionbtn">
            <button onClick={handleIncrementCount}>+</button>
            <p id={item._id}>{item.count}</p>
            <button onClick={handleDecrementCount}>-</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleEditItem;
