import React, { Component } from "react";
import AllClient from "../../pages/all-client/all-client";
import AllEstimation from "../../pages/all-estimation/all-estimation";
import Home from "../../pages/home/home";
import TopNan from "./topnav/topnav";
import Breadcrum from "./breadcrum/breadcrum";
import Footer from "./footer/footer";
import SideBar from "./sidebar/sidebar";
import { Container } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import "./layout.css";

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = { sideState: false };
  }

  toggleDrawer = (open) => (event) => {
    this.setState({ sideState: open });
  };

  render() {
    return (
      <div>
        <Container className="main-container">
          <TopNan
            sidebar={this.toggleDrawer(true)}
            handelLogout={this.props.handelLogout}
          />
          <Breadcrum />
          <SideBar
            anchor="left"
            sideStateVal={this.state.sideState}
            toggleDrawerFun={this.toggleDrawer}
          />
          <div className="main-content">
            <Switch>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/estimation">
                <AllEstimation />
              </Route>
              <Route path="/allclient">
                <AllClient />
              </Route>
            </Switch>
          </div>
          <Footer />
        </Container>
      </div>
    );
  }
}
