import React from "react";
import "./App.css";
import Login from "./login/login";
import Redirection from "./Redirection/Redirection";
import SSORedirection from "./Redirection/SSORedirection";
import Layout from "./shared/layout/layout";
import CheckRequests from "./common/checkRequests";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import history from "./common/history";

function App() {
    var referrer = document.referrer;
  console.log("Get : referrer url : ", referrer); 
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login">
          {" "}
          <Login />
        </Route>
        <Route exact path="/ssologin">
          {" "}
          <SSORedirection />
        </Route>
         <Route exact path="/validateshare">
          {" "}
          <Redirection />
        </Route>
        <Route>
          <Layout />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default CheckRequests(App);
