import React from "react";
import "./borderedContainer.css";

const BorderedContainer = (props) => {
  return (
    <div className={`border-container ${props.className}`}>
      {props.children}
    </div>
  );
};

export default BorderedContainer;
