import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import "./sidebar.css";
import { withRouter } from "react-router";

const Sidebarv2 = (props) => {
  const { history } = props;

  const dashboardClick = () => {
    const listitem = document.getElementsByClassName("listitem");
    const listArr = Array.from(listitem);
    listArr.map((el) => el.classList.remove("active"));

    const dashboradbutton = document.getElementById("dashboard");
    dashboradbutton.classList.add("active");

    history.push("/Recent-Estimations");
  };

  const clientClick = () => {
    const listitem = document.getElementsByClassName("listitem");
    const listArr = Array.from(listitem);
    listArr.map((el) => el.classList.remove("active"));

    const dashboradbutton = document.getElementById("allclients");
    dashboradbutton.classList.add("active");

    history.push("/All-Clients");
  };

  return (
    <div className="sidebar-bg  h-100">
      <List
        id="list-id"
        component="nav"
        aria-label="main mailbox folders"
        className="list"
      >
        <ListItem
          button
          className="listitem"
          id="dashboard"
          activeClassName="active"
          onClick={dashboardClick}
        >
          <ListItemIcon>
            <HomeIcon className="link-icon" />
          </ListItemIcon>
          <span>&nbsp;Dashboard</span>
        </ListItem>

        <ListItem
          button
          id="allclients"
          className="listitem"
          activeClassName="active"
          onClick={clientClick}
        >
          <ListItemIcon>
            <AssignmentIndIcon className="link-icon" />
          </ListItemIcon>
          <span>&nbsp;Clients</span>
        </ListItem>
      </List>
    </div>
  );
};

export default withRouter(Sidebarv2);
