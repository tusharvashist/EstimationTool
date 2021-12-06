import React, { useEffect } from "react";
import classes from "./HeaderTile.module.css";
import { MdPeopleOutline } from "react-icons/md";
import {
  IoPeopleCircleOutline,
  IoBusinessOutline,
  IoTodayOutline,
  IoCalculatorOutline,
} from "react-icons/io5";
import { VscNote, VscTypeHierarchy } from "react-icons/vsc";
import { BsMenuAppFill, BsStopwatch, BsCalendar3 } from "react-icons/bs";
import TextureOutlinedIcon from "@mui/icons-material/TextureOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

const HeaderTiles = (props) => {
  const icon = (word) => {
    if (props.name == "Hour") {
      word = "effortUnitHour";
    } else if (props.name == "Day") {
      word = "effortUnitDay";
    } else if (props.name == "Month") {
      word = "effortUnitMonth";
    }
    switch (word) {
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
      case "estimation":
        return <VscNote />;
        break;
      case "estimationType":
        return <VscTypeHierarchy />;
        break;
      case "effortUnitHour":
        return <BsStopwatch />;
        break;
      case "effortUnitDay":
        return <IoTodayOutline />;
        break;
      case "effortUnitMonth":
        return <BsCalendar3 />;
        break;
      case "cost":
        return <IoCalculatorOutline />;
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
        {props.details ? (
          <div className={classes.detail}>
            {props.details.map((el, i) =>
              i > 0 ? (
                <h4 className={classes.name}>
                  &nbsp;|&nbsp;
                  {el.website ? (
                    <a target="_blank" href={`//${el.website}`}>
                      {el.website}
                    </a>
                  ) : (
                    el.name
                  )}
                </h4>
              ) : (
                <h4 className={classes.name}>
                  {el.website ? (
                    <a target="_blank" href={`//${el.website}`}>
                      {el.website}
                    </a>
                  ) : (
                    el.name
                  )}
                </h4>
              )
            )}
          </div>
        ) : (
          <div className={classes.detail}>
            <h4 className={classes.name}>{props.name}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderTiles;
