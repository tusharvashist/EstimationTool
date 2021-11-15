import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import FolderIcon from "@material-ui/icons/Folder";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const Sidebarv2 = (props) => {
  const { history } = props;

  return (
    <div className="sidebar-bg  h-100">
      <List component="nav" aria-label="main mailbox folders" className="list">
        {/* <Link
          className="link-item"
          to={{
            pathname: "/estimation",
            state: { pageName: "Allestimation" },
          }}
        > */}
        <ListItem
          button
          className="listitem"
          onClick={() => history.push("/Recent-Estimations")}
        >
          <ListItemIcon>
            <HomeIcon className="link-icon" />
          </ListItemIcon>
          <span>&nbsp;Dashboard</span>
        </ListItem>
        {/* </Link> */}
        {/* <Link className="link-item" to="/allclient"> */}
        <ListItem
          button
          className="listitem"
          onClick={() => history.push("/All-Clients")}
        >
          <ListItemIcon>
            <AssignmentIndIcon className="link-icon" />
          </ListItemIcon>
          <span>&nbsp;Clients</span>
        </ListItem>
        {/* </Link> */}
      </List>
    </div>
  );
};

export default withRouter(Sidebarv2);
