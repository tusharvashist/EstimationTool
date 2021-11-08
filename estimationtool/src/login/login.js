import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { useHistory } from "react-router-dom";
import LoginSer from "./login.service";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./login.css";
import AuthSer from "../shared/service/auth";
import BorderedContainer from "../shared/ui-view/borderedContainer/BorderedContainer";

import logo from "./img/logo.png";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmail,
  setFirstName,
  setLastName,
  setFullName,
  setRole
} from "../Redux/loginRedux";

function Alert(props) {
  return (
    <MuiAlert severity="error" elevation={6} variant="filled" {...props} />
  );
}

export default function Login(props) {
  const loginRedux = useSelector((state) => state.login);
  const dispatch = useDispatch();

  let history = useHistory();
  const [user, setUser] = React.useState({
    email: "admin@pyramidconsultinginc.com",
    pass: "admin",
  });
  const [isShowSpinner, setIsShowSpinner] = React.useState(false);
  const [isValidCredentials, setIsValidCredentials] = React.useState(true);

  const handleEmail = (e) => {
    let val = e.target.value;
    setUser({ ...user, email: val });
  };

  const handlePass = (e) => {
    let val = e.target.value;
    setUser({ ...user, pass: val });
  };

  const redirectDashbord = () => {
    let url = "/estimation";
    history.push(url);
  };

  const autoHideMsZ = () => {
    setIsValidCredentials(false);
    setTimeout(() => {
      setIsValidCredentials(true);
    }, 900);
  };

  const handleLogin = function (e) {
    e.preventDefault();
    isShowSpinner ? setIsShowSpinner(false) : setIsShowSpinner(true);
    LoginSer.login(user)
      .then(async (res) => {
        let result = await res;
        await AuthSer.login(result.data.body);
        dispatch(setEmail(result.data.body.email));
        dispatch(setFirstName(result.data.body.firstName));
        dispatch(setLastName(result.data.body.lastName));
        dispatch(setRole(result.data.body.roles.roleName));
        dispatch(
          setFullName(
            result.data.body.firstName + " " + result.data.body.lastName
          )
        );

        setIsShowSpinner(false);
        redirectDashbord();
      })
      .catch((err) => {
        setIsShowSpinner(false);
        autoHideMsZ();
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container className="h-100 login-wrp" direction="row">
      <Grid item xs={6} className="bg-img">
        <Grid
          container
          justify="center"
          alignItems="center"
          className="bg-mask"
        >
          {/* <div className="promo-box"> 
                        <h1 className="title"> Estimation Tool</h1> 
                        <p className="sub-title">The Scalable Path Project estimator. A tool that's flexible enough to help you estimate costs.</p>
                    </div> */}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        alignItems={"center"}
        className="login-widget_container"
      >
        <BorderedContainer className="login-widget">
          <Grid
            container
            justify="center"
            alignItems="center"
            className="h-100"
          >
            <Box textAlign="center">
              <img src={logo} alt="logo" />
              <h1 className="login-title">EstimationTool Login</h1>
              <h6 className="env">
                {" "}
                <span className="env-title">{process.env.REACT_APP_NAME}-</span>
                <span className="env-title">{process.env.NODE_ENV}</span>
              </h6>

              <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="error">
                  Wrong email or password.
                </Alert>
              </Snackbar>
              <form onSubmit={handleLogin}>
                <FormControl className="email-controller">
                  <TextField
                    value={user.email}
                    placeholder="Email"
                    onChange={handleEmail}
                    id="email"
                    size="small"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    value={user.pass}
                    id="pass"
                    type="password"
                    placeholder="password"
                    onChange={handlePass}
                    size="small"
                    variant="outlined"
                  />
                </FormControl>
                <Box height="20" className="error-message-wrp">
                  {!isValidCredentials ? (
                    <Box component="p" className="error">
                      Wrong email or password.
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="w-100"
                >
                  Login{" "}
                  {isShowSpinner ? (
                    <Box ml={1}>
                      {" "}
                      <CircularProgress color="inherit" size={13} mr={2} />{" "}
                    </Box>
                  ) : (
                    ""
                  )}
                </Button>
              </form>
            </Box>
          </Grid>
        </BorderedContainer>
      </Grid>
    </Grid>
  );
}
