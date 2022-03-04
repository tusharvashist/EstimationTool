import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { IoPeopleOutline, IoHomeOutline } from "react-icons/io5";
import "./sidebar.css";
import { withRouter } from "react-router";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";

const Sidebarv2 = (props) => {
  const { history } = props;

  const dashboardClick = () => {
    const listitem = document.getElementsByClassName("listitem");
    const listArr = Array.from(listitem);
    listArr.forEach((el) => el.classList.remove("active"));

    const dashboradbutton = document.getElementById("dashboard");
    dashboradbutton.classList.add("active");

    history.push("/Recent-Estimations");
  };

  const clientClick = () => {
    const listitem = document.getElementsByClassName("listitem");
    const listArr = Array.from(listitem);
    listArr.forEach((el) => el.classList.remove("active"));

    const dashboradbutton = document.getElementById("allclients");
    dashboradbutton.classList.add("active");

    history.push("/All-Clients");
  };

  const assumptionClick = () => {
    const listitem = document.getElementsByClassName("listitem");
    const listArr = Array.from(listitem);
    listArr.forEach((el) => el.classList.remove("active"));

    const dashboradbutton = document.getElementById("assumption");
    dashboradbutton.classList.add("active");
    history.push("/Assumptions");
  };

  const userManagementClick = () => {
    const listitem = document.getElementsByClassName("listitem");
    const listArr = Array.from(listitem);
    listArr.forEach((el) => el.classList.remove("active"));

    const dashboradbutton = document.getElementById("userManagement");
    dashboradbutton.classList.add("active");
    history.push("/RoleManagement");
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
          className="listitem active"
          id="dashboard"
          activeClassName="active"
          onClick={dashboardClick}
        >
          <ListItemIcon>
            <IoHomeOutline className="link-icon" />
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
            <IoPeopleOutline className="link-icon" />
          </ListItemIcon>
          <span>&nbsp;Clients</span>
        </ListItem>
        <ListItem
          button
          id="assumption"
          className="listitem"
          activeClassName="active"
          onClick={assumptionClick}
        >
          <ListItemIcon>
            <HiOutlineLightBulb className="link-icon" />
          </ListItemIcon>
          <span>&nbsp;Assumptions</span>
        </ListItem>
        <ListItem
          button
          id="userManagement"
          className="listitem"
          activeClassName="active"
          onClick={userManagementClick}
        >
          <ListItemIcon>
            <RiUserSettingsLine className="link-icon" />
          </ListItemIcon>
          <span>&nbsp;Role Management</span>
        </ListItem>
      </List>
    </div>
  );
};

export default withRouter(Sidebarv2);
