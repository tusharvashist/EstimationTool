import React from "react";
import classes from "./HeaderTile.module.css";
import { MdPeopleOutline, MdQueryStats } from "react-icons/md";
import {
  IoBusinessOutline,
  IoTodayOutline,
  IoCalculatorOutline,
} from "react-icons/io5";
import { RiTimeLine } from "react-icons/ri";
import { VscNote, VscTypeHierarchy } from "react-icons/vsc";
import { BsMenuAppFill, BsStopwatch, BsCalendar3 } from "react-icons/bs";
import TextureOutlinedIcon from "@mui/icons-material/TextureOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";

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
      case "link":
        return <InsertLinkOutlinedIcon />;
      case "project":
        return <BsMenuAppFill />;
      case "business":
        return <IoBusinessOutline />;
      case "estimation":
        return <VscNote />;
      case "estimationType":
        return <VscTypeHierarchy />;
      case "effortUnitHour":
        return <BsStopwatch />;
      case "effortUnitDay":
        return <IoTodayOutline />;
      case "effortUnitMonth":
        return <BsCalendar3 />;
      case "cost":
        return <IoCalculatorOutline />;
      case "contingency":
        return <MdQueryStats />;
      case "timeline":
        return <RiTimeLine />;
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
                <h4 key={i} className={classes.name}>
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
                <h4 key={i} className={classes.name}>
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
