import React from "react";

const RoleEditItem = (props) => {
  return (
    <>
      <p>Lead</p>
      <div className="optionbtn">
        <button>+</button>
        <p>{props.rowEditData[0]}</p>
        <button>-</button>
      </div>
    </>
  );
};

export default RoleEditItem;
