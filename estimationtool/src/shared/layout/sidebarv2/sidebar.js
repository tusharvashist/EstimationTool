import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import FolderIcon from "@material-ui/icons/Folder";
import "./sidebar.css";
import { Link } from "react-router-dom";
export default function Sidebarv2(props) {
  return (
    <div className="sidebar-bg  h-100">
      <List component="nav" aria-label="main mailbox folders" className="list">
        <ListItem button className="listitem">
          <ListItemIcon>
            <HomeIcon className="link-icon" />
          </ListItemIcon>
          <Link
            className="link-item"
            to={{
              pathname: "/estimation",
              state: { pageName: "Allestimation" },
            }}
          >
            Estimations
          </Link>
        </ListItem>
        <ListItem button className="listitem">
          <ListItemIcon>
            <AssignmentIndIcon className="link-icon" />
          </ListItemIcon>
          <Link className="link-item" to="/allclient">
            Clients
          </Link>
        </ListItem>
      </List>
    </div>
  );
}
