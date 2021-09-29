import React from 'react'
import './topnav.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import AuthSer from '../../service/auth';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Box } from '@material-ui/core';
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
                        <Typography variant="h1" className={classes.title} >
                            EstimationTool <span className="env-title">{process.env.REACT_APP_NAME}-</span>
                            <span className="env-title">{process.env.NODE_ENV}</span>
                        </Typography>
                        <div>
                          <Box onClick={handleLogout}>
                            <ExitToAppIcon/>
                          </Box>
                        </div>
                    </Toolbar> 
                </AppBar> 
        </div>
    )
}
