import React, { useEffect } from "react";
import classes from "./HeaderTile.module.css";
import { MdPeopleOutline } from "react-icons/md";
import { IoPeopleCircleOutline, IoBusinessOutline } from "react-icons/io5";
import { VscTools } from "react-icons/vsc";
import { BsMenuAppFill } from "react-icons/bs";
import TextureOutlinedIcon from "@mui/icons-material/TextureOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

const HeaderTiles = (props) => {
  const icon = (name) => {
    switch (name) {
      case "client":
        return <MdPeopleOutline />;
        break;
      case "link":
        return <InsertLinkOutlinedIcon />;
        break;
      case "project":
        return <BsMenuAppFill />;
        break;
      case "business":
        return <IoBusinessOutline />;
        break;
      default:
        return <TextureOutlinedIcon />;
    }
  };

  return (
    <div className={classes.tilecontainer}>
      <div className={classes.icon}>{icon(props.iconname)}</div>
      <div className={classes.information}>
        <h4 className={classes.title}>{props.title}</h4>
        <h4 className={classes.name}>
          {props.website ? (
            <a target="_blank" href={`//${props.website}`}>
              {props.website}
            </a>
          ) : (
            props.name
          )}
        </h4>
      </div>
    </div>
  );
};

export default HeaderTiles;
