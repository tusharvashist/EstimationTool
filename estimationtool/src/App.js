import React from "react";
import "./styles.css";
import { Route, Switch } from "react-router-dom";
import Drawer from "./components/drawer/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Clients from "./pages/Client/Clients"
import Projects from "./pages/Project/Projects"
import RecentEstimation from "./pages/Estimation/RecentEstimation"

import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText, AppBar, Toolbar, Typography
} from "@material-ui/core";
import { EvStation } from "@material-ui/icons";

const useStyles = makeStyles({
  container: {
    display: "flex"
  }
});

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Drawer />
      
      <Switch>
        <Route exact from="/" render={props => <RecentEstimation {...props} />} />
        <Route exact path="/client" render={props => <Clients {...props} />} />
        <Route exact path="/project" render={props => <Projects {...props} />} />

      </Switch>
      

    </div>
  );
}


