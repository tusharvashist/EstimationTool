import React from "react";
import "./App.css";
import Login from "./login/login";
import Layout from "./shared/layout/layout";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  HashRouter,
} from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login">
          {" "}
          <Login />
        </Route>
        <Route>
          <Layout />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
