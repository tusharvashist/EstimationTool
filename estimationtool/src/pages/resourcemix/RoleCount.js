import React from "react";
import "./RoleCount.css";

const RoleCount = (props) => {
  return (
    <React.Fragment>
      <div className="role">
        <p>
          {props.data[0]} Lead, {props.data[1]} Sr. Developer, {props.data[2]}{" "}
          Jr. Developer
        </p>
      </div>
    </React.Fragment>
  );
};

export default RoleCount;
