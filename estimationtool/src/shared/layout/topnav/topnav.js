import React from "react";
import "./topnav.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function Topnav(props) {
  const handelLogout = () => {
    props.handelLogout();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.sidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">EstimationTool</Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="logout"
            onClick={handelLogout}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
