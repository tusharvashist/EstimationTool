import React from 'react'
import './topnav.css';
import avatarImg from './user_img.jpg';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Box } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useHistory } from "react-router-dom";
import AuthSer from '../../service/auth';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontSize:"18px"
    },
  }));
  export default function Topnav(props) {
    let history = useHistory();
    const classes = useStyles();
  
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
      };
      
    const redirectLogin =()=>{
        let url = "/login"
       history.push(url)  
       handleClose();
    }

   
    const handleLogout = ()=>{
        AuthSer.logout();
        redirectLogin()
    }
    return (
        <div className="es-topnav">
                <AppBar position="static">
                    <Toolbar className="es-toolbar">
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={props.sidebar}>
                            <MenuIcon  />
                        </IconButton>
                        <Typography variant="h1" className={classes.title} >
                            EstimationTool <span className="env-title">{process.env.REACT_APP_NAME}-</span>
                            <span className="env-title">{process.env.NODE_ENV}</span>
                        </Typography>
                        <div>
                        <Box display="flex" alignItems="center">

                        <Box justifySelf="flex-end" flexDirection="row" mr={1}>
                            <Avatar alt="Remy Sharp" src={avatarImg} /> 
                        </Box>
                        <Box aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} display="flex" alignItems="center">
                          <span className="user-name">Jitu Jahagirdar</span> <ArrowDropDownIcon/>
                        </Box>
                        </Box>
                        
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                        </div>

                       
                    </Toolbar> 
                </AppBar>
               
        </div>
    )
}
