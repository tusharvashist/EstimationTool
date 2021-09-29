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
export default function Sidebarv2(props){
    return (
        <div className="sidebar-bg  h-100">
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon className="link-icon" />
                            </ListItemIcon>
                            <Link className="link-item" to={{ pathname:"/allestimation", state:{pageName:'Allestimation'}}} >Estimations</Link>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <AssignmentIndIcon className="link-icon"/>
                            </ListItemIcon>
                            <Link className="link-item" to="/allclient">Clients</Link>
                        </ListItem>
                    
                        <ListItem button>
                            <ListItemIcon>
                                <FolderIcon className="link-icon" />
                            </ListItemIcon>
                            <Link className="link-item" to="/project">Project</Link>
                        </ListItem>
                    </List>
        </div>
    )
}
