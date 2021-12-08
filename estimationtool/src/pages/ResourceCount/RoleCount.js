import React from "react";
import "./RoleCount.css";

const RoleCount = ({ data: { rolecount = [] } = {} }) => {
 // console.log("props", props);

  return (
    <React.Fragment>
      <div className="role">
        {rolecount.reduce((acc, value) => {
          console.log("acc, value", acc, value);
          return acc + value.count + " " + (value.role || "Lead") + "/ ";
        }, "")}
      </div>
    </React.Fragment>
  );
};

export default RoleCount;
