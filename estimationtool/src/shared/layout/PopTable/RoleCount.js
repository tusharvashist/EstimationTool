import { CallMissedSharp } from "@material-ui/icons";
import React, { useState } from "react";
import BorderContainer from "../../ui-view/borderedContainer/BorderedContainer";
import "./RoleCount.css";

const RoleCount = (props) => {
  const [count, setCount] = useState(0);

  const handleRolesTable = () => {
    const roleDiv = document.querySelector(".rolelist");
    roleDiv.classList.toggle("close-role");
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <React.Fragment>
      <BorderContainer className="rolelist parentrole close-role">
        <div className="option">
          <p>Lead</p>
          <div className="optionbtn">
            <button onClick={handleIncrement}>+</button>
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
        <div className="option">
          <p>Lead</p>
          <div className="optionbtn">
            <button>+</button>
            <p>1</p>
            <button>-</button>
          </div>
        </div>
      </BorderContainer>
      <div onClick={handleRolesTable} className="role">
        <p>{count} Lead, 1 Sr., 1 Jr</p>
      </div>
    </React.Fragment>
  );
};

export default RoleCount;
