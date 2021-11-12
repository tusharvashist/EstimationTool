import React from "react";
import "./topnav.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import AuthSer from "../../service/auth";
import { styled } from "@mui/material/styles";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  PersonAdd,
  Settings,
  ExitToApp,
  MailOutlineRounded,
  MailRounded,
  Mail,
  AddCircle,
} from "@material-ui/icons";
import { Badge, Box, Divider } from "@material-ui/core";
import ListItemIcon from "@mui/material/ListItemIcon";
import logo from "../../../login/img/logo.png";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";

import { useSelector, useDispatch } from "react-redux";
import {
  setAdmin,
  setContributor,
  setSuperAdmin,
} from "../../../Redux/roleRedux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `3px solid ${theme.palette.background.paper}`,
    padding: "1px 6px",
    fontSize: "9px",
  },
}));

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
    fontSize: "16px",
  },
}));
export default function Topnav(props) {
  const roleState = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const loginRedux = useSelector((state) => state.login);
  let history = useHistory();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(false);

  const redirectLogin = () => {
    let url = "/login";
    history.push(url);
    //  handleClose();
  };

  const handleLogout = () => {
    dispatch(setAdmin(false));
    dispatch(setContributor(false));
    dispatch(setSuperAdmin(false));
    AuthSer.logout();
    redirectLogin();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = () => {
    setAnchorEl(true);
  };

  function stringAvatar() {
    var name = loginRedux.fullName;
    var firstChar = "";
    var secondChar = "";
    if (loginRedux.firstName !== undefined) {
      if (loginRedux.firstName?.length !== 0) {
        firstChar = loginRedux.firstName[0][0];
      }
    }
    if (loginRedux.lastName !== undefined) {
      if (loginRedux.lastName?.length !== 0) {
        secondChar = loginRedux.lastName[0][0];
      }
    }

    return {
      sx: {
        bgcolor: stringToColor(name),
      },

      children: `${firstChar}${secondChar}`,
    };
  }

  function roleName() {
    if (roleState.isContributor) {
      return "Contributor";
    } else if (roleState.isAdmin) {
      return "Admin";
    } else {
      return "Super Admin";
    }
  }

  return (
    <div className="es-topnav">
      <AppBar
        position="fixed"
        color="white"
        className="header-decoration"
        elevation="1"
      >
        <Toolbar className="es-toolbar">
          <img src={logo} alt="logo" /> &nbsp; | &nbsp;
          <Typography variant="h1" className={classes.title}>
            EstimationTool{" "}
            <span className="env-title">{process.env.REACT_APP_NAME}-</span>
            <span className="env-title">{process.env.NODE_ENV}</span>
          </Typography>
          <div>
            <Box>
              <Avatar onClick={handleOpen} {...stringAvatar()} />
            </Box>
          </div>
          <div className="profile-menu">
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                className: "profile-menu",
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <StyledBadge
                  badgeContent={
                    (roleState.isContributor && "Contributor") ||
                    (roleState.isSuperAdmin && "Super Admin") ||
                    (roleState.isAdmin && "Admin")
                  }
                  color="secondary"
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                >
                  <Avatar />
                </StyledBadge>{" "}
                {loginRedux.fullName == "undefined" ? "" : loginRedux.fullName}
              </MenuItem>
              <MenuItem>
                <MailOutlineRounded />
                &nbsp;
                {loginRedux.email == "undefined"
                  ? "dummy.dummy@dummy.com"
                  : loginRedux.email}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToApp fontSize="small" />
                </ListItemIcon>
                &nbsp; Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
