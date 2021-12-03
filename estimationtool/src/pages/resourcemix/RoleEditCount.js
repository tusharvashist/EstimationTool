import React from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "../../shared/layout/PopTable/RoleCount.css";

const RoleEditCount = (props) => {
  const handlePlacement = (e) => {
    const roleDiv = document.querySelector(".rolelist");
  };
  document.addEventListener("click", handlePlacement);

  return (
    <BorderedContainer className="rolelist parentrole">
      <div className="option">
        <p>Lead</p>
        <div className="optionbtn">
          <button>+</button>
          <p>{props.rowEditData[0]}</p>
          <button>-</button>
        </div>
      </div>
      <div className="option">
        <p>Lead</p>
        <div className="optionbtn">
          <button>+</button>
          <p>1</p>
          <button>-</button>
        </div>
      </div>
      <div className="option">
        <p>Lead</p>
        <div className="optionbtn">
          <button>+</button>
          <p>1</p>
          <button>-</button>
        </div>
      </div>
    </BorderedContainer>
  );
};

export default RoleEditCount;
