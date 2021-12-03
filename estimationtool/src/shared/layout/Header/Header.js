import React from "react";
import BorderedContainer from "../../ui-view/borderedContainer/BorderedContainer";
import HeaderTiles from "./HeaderTiles";

const Header = (props) => {
  return (
    <BorderedContainer>
      <HeaderTiles
        iconname={props.iconname}
        title={props.title}
        name={props.name}
        website={props.website}
      />
    </BorderedContainer>
  );
};

export default Header;
