import React from "react";

const RoleEditItem = (props) => {
  const handleIncrementCount = (e) => {
    console.log("id", e);
  };

  const handleDecrementCount = (e) => {};

  return (
    <div className="roleitem">
      {/* {props.count.map((item) => (
        <div className="roleitem_list">
          <p>{item.skill}</p>
          <div className="optionbtn">
            <button onClick={handleIncrementCount}>+</button>
            <p id={item._id}>{item.count}</p>
            <button onClick={handleDecrementCount}>-</button>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default RoleEditItem;
