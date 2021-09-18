import React from 'react'
import { Drawer } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import FolderIcon from '@material-ui/icons/Folder';
import './sidebar.css';
import {
    Link
  } from "react-router-dom";
export default function Sidebar(props){
    return (
        <div>
            <Drawer className="asidebar-wrp" anchor={props.anchor}
                                            open={props.sideStateVal}
                                            onClose={props.toggleDrawerFun(false)}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <Link to={{ pathname:"/allestimation", state:{pageName:'Allestimation'}}} onClick={props.toggleDrawerFun(false)}>Estimations</Link>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AssignmentIndIcon />
                            </ListItemIcon>
                            <Link  to="/allclient"  onClick={props.toggleDrawerFun(false)} >Clients</Link>
                        </ListItem>
                    
                        <ListItem button>
                            <ListItemIcon>
                                <FolderIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Projects" />
                        </ListItem>
                    </List>
            </Drawer>
        </div>
    )
}
