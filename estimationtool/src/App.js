
import React from 'react';
import './App.css';
import Login from './login/login';
import Layout from './shared/layout/layout';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

function App() {
  return ( 
  <BrowserRouter> 
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route exact path="/login"> <Login/></Route>
      <Route>
          <Layout/>
      </Route>
    </Switch>
  </BrowserRouter>);
}

export default App;
