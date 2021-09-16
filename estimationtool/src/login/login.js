import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import loginSer from "./login.service";
import authSer from "../shared/service/auth";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  openSuccessToasterWithMsg,
  openErrorToasterWithMsg,
} from "../store/toasterSlice";

import "./login.css";
function Login(props) {
  const dispatch = useDispatch();

  let history = useHistory();
  const [state, setState] = React.useState({
    email: "",
    pass: "",
  });

  const handleEmail = (e) => {
    let val = e.target.value;
    setState({ ...state, email: val });
  };

  const handlePass = (e) => {
    let val = e.target.value;
    setState({ ...state, pass: val });
  };

  const redirectEstimation = () => {
    props.LoginFun();
    let url = "/estimation";
    history.push(url);
  };

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/home");
    }
  }, []);

  const isVlaidLogin = () => {
    // if (state.email === "admin" && state.pass === "admin") {
    // console.log("valid user")
    // redirectDashbord()
    // return true

    // }
    // console.log("Not valid user")
    return true;
  };

  const handleLogin = function (e) {
    e.preventDefault();
    if (isVlaidLogin()) {
      //call user login
      login();
    }
  };

  //user login
  const login = () => {
    if (state.email === "admin" && state.pass === "admin") {
      loginSer
        .login(state)
        .then((res) => {
          console.log(res);
          authSer.login(res);
          //    authSer.logout(res);
          userLoginSuccefulMsg();
        })
        .catch((error) => {
          //console.log(error.message);
          userLoginFailMsg();
        });
    } else {
      userLoginFailMsg();
    }
  };

  //show successful msg
  const userLoginSuccefulMsg = () => {
    dispatch(
      openSuccessToasterWithMsg({ message: "User Logging Successfully!" })
    );

    redirectEstimation(); //redirect to all Estimation page
  };

  //show login fail msg
  const userLoginFailMsg = () => {
    dispatch(openErrorToasterWithMsg({ message: "User Login Fail!" }));
  };

  return (
    <Grid container className="h-100 login-wrp" direction="row">
      <Grid item xs={6} className="bg-img">
        <Grid
          container
          className="bg-mask"
          justifyContent="center"
          alignItems="center"
        >
          <div className="promo-box">
            <h1 className="title"> Estimation Tool </h1>
            <p className="sub-title">
              The Scalable Path Project estimator. A tool that's flexible enough
              to help you estimate costs.
            </p>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className="h-100"
          direction="column"
        >
          <h1 className="login-title"> Login</h1>
          <form onSubmit={handleLogin}>
            <FormControl>
              <TextField
                value={state.email}
                placeholder="Email"
                onChange={handleEmail}
                id="email"
                size="small"
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <TextField
                value={state.pass}
                id="pass"
                type="password"
                placeholder="password"
                onChange={handlePass}
                size="small"
                variant="outlined"
              />
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="w-100"
            >
              {" "}
              Login{" "}
            </Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
