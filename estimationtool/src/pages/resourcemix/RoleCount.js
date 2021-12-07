import React from "react";
import "./RoleCount.css";

const RoleCount = (props) => {
  console.log("props",props)

  return (
    <React.Fragment>
      <div className="role">
        
        <p>
          {props.data} Lead, {props.data} Sr. Developer, {props.data}{" "}
          Jr. Developer
        </p>
      </div>
    </React.Fragment>
  );
};

export default RoleCount;
