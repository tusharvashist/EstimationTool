import React from "react";
import BorderedContainer from "../../shared/ui-view/borderedContainer/BorderedContainer";
import "./RoleCount.css";
import RoleEditItem from "./RoleEditItem";

const RoleEditCount = (props) => {
  console.log("propsEdit ", props);
  return (
    <BorderedContainer className="rolelist parentrole">
      <div className="option">
        <RoleEditItem
          rowEditData={props.rowEditData}
          masterData={props.masterData}
          handleEditChange={props.handleEditChange}
        />
      </div>
    </BorderedContainer>
  );
};

export default RoleEditCount;
