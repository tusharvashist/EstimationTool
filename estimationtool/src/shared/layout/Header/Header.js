import React from "react";
import BorderedContainer from "../../ui-view/borderedContainer/BorderedContainer";
import HeaderTiles from "./HeaderTiles";

const Header = (props) => {
  return (
    <BorderedContainer>
      <HeaderTiles
        iconname={props.iconname}
        title={props.title}
        details={props.details}
        name={props.name}
      />
    </BorderedContainer>
  );
};

export default Header;
