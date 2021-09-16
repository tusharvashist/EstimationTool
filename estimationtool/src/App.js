import React, { useState } from "react";
import "./App.css";
import Login from "./login/login";
import Layout from "./shared/layout/layout";
import GlobalTosterMsg from "./shared/ui-view/toaster-msg/toaster-msg";

import { BrowserRouter } from "react-router-dom";
import Auth from "./shared/service/auth";

function App() {
  const [isLogin, setIslogin] = useState(Auth.isLogin());
  const handelLogin = () => {
    setIslogin(true);
  };
  const handelLogout = () => {
    Auth.logout();
    setIslogin(false);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <GlobalTosterMsg />
        {isLogin ? (
          <Layout handelLogout={handelLogout} />
        ) : (
          <Login LoginFun={handelLogin} />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
