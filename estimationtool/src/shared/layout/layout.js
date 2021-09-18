import React, { Component } from 'react'
import AllClient from '../../pages/all-client/all-client';
import Allestimation from '../../pages/allestimation/allestimation';
import TopNan from './topnav/topnav';
import Breadcrum from './breadcrum/breadcrum';
import Footer from './footer/footer'
import SideBar from './sidebar/sidebar';
import {Container } from '@material-ui/core';
import {Switch, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import './layout.css';

const EsContainer = withStyles((props) => {
    return ({
        root: {
            paddingRight: "0",
            paddingLeft: "0",
        }
    })
})(Container);
export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {sideState: false};
      }
    
     toggleDrawer = (open)=>(event)=>{this.setState({sideState:open})}

    render() {
        return (
            <div>
                <EsContainer className="main-container" maxWidth={false}  fixed={false}>
                    <TopNan sidebar={this.toggleDrawer(true)}/>
                    <Breadcrum/>
                        <SideBar anchor='left' sideStateVal={this.state.sideState} toggleDrawerFun={this.toggleDrawer}/>
                        <div className="main-content">
                            <Switch>
                               <Route exact path="/allestimation">
                                   <Allestimation/>
                                </Route>
                                <Route path="/allclient">
                                    <AllClient />
                                </Route>
                            </Switch>
                        </div>
                        <Footer/> 
                </EsContainer>
            </div>
        )
    }
}
