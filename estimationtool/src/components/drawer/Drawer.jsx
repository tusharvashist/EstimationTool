import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { withRouter } from "react-router-dom";
import { blue, red } from "@material-ui/core/colors";
import AssignmentIcon from '@material-ui/icons/Assignment';
import InfoIcon from '@material-ui/icons/Info';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import { Gradient } from "@material-ui/icons";
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

/*
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "250px",
  },
  drawerlist: {
    backgroundColor: '#112768',
    height: '100%'

  },
  draweritem: {
    color: '#fff'

  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

}));

*/

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
    },
    menuButton: {
    marginRight: 16,
    marginLeft: -12
    },
   
  drawer: {
    width: "250px",
  },
  drawerlist: {
    backgroundColor: '#112768',
    height: '100%',
    marginTop: 60,
    width: '250px'
  },
  draweritem: {
    color: '#fff'

  },

  appBar: {
    backgroundColor: '#112768',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const Drawer = props => {
  const { history } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const itemsList = [
    {
      text: "Estimation",
      icon: <HomeIcon />,
      onClick: () => history.push("/")
    },
    {
      text: "Clients",
      icon: <SupervisorAccountIcon />,
      onClick: () => history.push("/client")
    },
    {
      text: "Projects",
      icon: <AssignmentIcon />,
      onClick: () => history.push("/project")
    },
    // {
    //   text: "Estimations",
    //   icon: <MailIcon />,
    //   onClick: () => history.push("/employees")
    // }
  ];
  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>

          <Typography variant="h6" noWrap>
            Pyramid It Consulting
          </Typography>
          <section className={classes.rightToolbar}>
 <IconButton color="inherit" aria-label="Edit">
 <ExitToAppIcon />
 </IconButton>
 </section>

        </Toolbar>
      </AppBar>
      <MUIDrawer variant="permanent" className={classes.drawer}>
        <List className={classes.drawerlist}>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick} >
                {icon && <ListItemIcon className={classes.draweritem}>{icon}</ListItemIcon>}
                <ListItemText primary={text} className={classes.draweritem} />
              </ListItem>
            );
          })}

        </List>
        <div >Pyramid It Consulting</div>
      </MUIDrawer>
    </div>
  );
};

export default withRouter(Drawer);
