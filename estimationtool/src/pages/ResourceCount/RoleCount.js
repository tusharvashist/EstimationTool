import React from "react";
import "./RoleCount.css";

const RoleCount = (props) => {
  console.log("props",props)

  return (
    <React.Fragment>
      <div className="role">
        
        <p>
        {props.count.map(item => (
           <span id={item._id}>{item.count} {item.skill}, </span>
        )

        )}
        </p>
      </div>
    </React.Fragment>
  );
};

export default RoleCount;
