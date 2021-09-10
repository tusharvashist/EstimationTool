
import React,{useState} from 'react';
import './App.css';
import Login from './login/login';
import Layout from './shared/layout/layout';

import {BrowserRouter} from "react-router-dom";

function App() {
  const [isLogin,setIslogin] = useState(false);
  const handelLogin=()=>{
    setIslogin(true)
  }
  return ( 
  <BrowserRouter> 
    <div className="App">
      {
        isLogin ? <Layout/> :  <Login LoginFun={handelLogin}/>
      }
    </div> 
  </BrowserRouter> );
}

export default App;
