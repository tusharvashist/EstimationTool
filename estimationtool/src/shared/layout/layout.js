import React, { Component } from "react";
import AllClient from "../../pages/all-client/all-client";
import Projects from "../../pages/project/projects";
import Allestimation from "../../pages/allestimation/allestimation";
import TopNan from "./topnav/topnav";
import Breadcrum from "./breadcrum/breadcrum";
import Footer from "./footer/footer";
import SideBarv2 from "./sidebarv2/sidebar";
import ClientDetails from "../../pages/client-details/client-details";
import ProjectDetails from "../../pages/project-details/project-details";

import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Switch, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import "./layout.css";
import EstimationCreation from "../../pages/estimationCreation/EstimationCreation";
import EstimationDetail from "../../pages/estimationDetail/EstimationDetail";

const EsContainer = withStyles((props) => {
  return {
    root: {
      paddingRight: "0",
      paddingLeft: "0",
    },
  };
})(Container);

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
        <EsContainer className="main-container" maxWidth={false} fixed={false}>
          <TopNan sidebar={this.toggleDrawer(true)} />
          <div className="main-content">
            <Grid container className="h-100" alignItems="stretch">
              <Grid item className="h-100" xs={2}>
                <SideBarv2 className="h-100" className="bg-vvv" />
              </Grid>
              <Grid item className="h-100" xs={10}>
                <Breadcrum />
                <Switch>
                  <Route exact path="/estimation">
                    <Allestimation />
                  </Route>
                  <Route
                    exact
                    path="/All-Clients"
                    render={(props) => <AllClient {...props} />}
                  >
                    {/* <AllClient /> */}
                  </Route>
                  <Route path="/project">
                    <Projects />
                  </Route>
                  {/* <Route path="/createEstimate">
                    <EstimationDetail />
                  </Route> */}
                  <Route
                    exact
                    path="/All-Clients/:clientName"
                    render={(props) => <ClientDetails {...props} />}
                  >
                    {/* <ClientDetails /> */}
                  </Route>
                  <Route exact path="/All-Clients/:clientName/:projectid">
                    <ProjectDetails />
                  </Route>
                  <Route
                    path="/create-estimation"
                    render={(props) => (
                      <EstimationCreation
                        clientInfo={props.clientInfo}
                        projectInfo={props.projectInfo}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/All-Clients/:clientName/:projectid/Estimation-Detail"
                  >
                    <EstimationDetail />
                  </Route>
                </Switch>
              </Grid>
            </Grid>
          </div>
          {/* <Footer /> */}
        </EsContainer>
      </div>
    );
  }
}
