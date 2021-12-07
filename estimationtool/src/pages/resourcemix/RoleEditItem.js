import React from "react";

const RoleEditItem = (props) => {

  const handleIncrementCount = (e) => {
console.log("id",e)
  }

  const handleDecrementCount = (e) => {

  }

  return (
   <>
    {props.count.map(item => (
      <>
      <p>{item.skill}</p>
      <div className="optionbtn">
        <button onClick={handleIncrementCount}>+</button>
        <p id={item._id}>{item.count}</p>
        <button onClick={handleDecrementCount}>-</button>
      </div>
      </>
  ))
}
      </>
  );
};

export default RoleEditItem;
