import React from "react";
import "./topnav.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import AuthSer from "../../service/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Box } from "@material-ui/core";
import logo from "../../../login/img/logo.png";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';


import { useSelector } from 'react-redux'

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

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
       var firstChar = '';
    var secondChar = '';
      if(loginRedux.firstName.length !== 0){
        firstChar = loginRedux.firstName[0][0];
      }
     if(loginRedux.lastName.length !== 0){
       secondChar = loginRedux.lastName[0][0];
      }
    
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
 
    children: `${firstChar}${secondChar}`,
  };
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
            <Box >
              <Avatar onClick={handleOpen} {...stringAvatar()} />
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem ><b>{loginRedux.fullName}</b></MenuItem>
                <MenuItem >{loginRedux.email}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>

            </Box>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
