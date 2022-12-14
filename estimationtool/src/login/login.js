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

import { USER_PERMISSIONS } from "../shared/ui-view/constant/enum";
import logo from "./img/celsior_600x600_01_Logo.jpg";
import { useDispatch } from "react-redux";
import {
  setEmail,
  setFirstName,
  setLastName,
  setFullName,
  setRole,
  setRolePermission,
} from "../Redux/loginRedux";
import { setAdmin, setContributor, setSuperAdmin } from "../Redux/roleRedux";

function Alert(props) {
  return (
    <MuiAlert severity="error" elevation={6} variant="filled" {...props} />
  );
}

export default function Login(props) {
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
    let url = "/Recent-Estimations";
    history.push(url);
  };

  const autoHideMsZ = () => {
    setIsValidCredentials(false);
    setTimeout(() => {
      setIsValidCredentials(true);
    }, 900);
  };

  const mapPermissions = (permissionArray) => {
    const permissionObj = {};
    const finalPermissions = {};
    for (let perm of permissionArray) {
      permissionObj[perm.token] = true;
    }
    for (let userP in USER_PERMISSIONS) {
      finalPermissions[USER_PERMISSIONS[userP]] = !!permissionObj[userP];
    }

    return { ...finalPermissions };
  };

  const handleLogin = function (e) {
    e.preventDefault();
    isShowSpinner ? setIsShowSpinner(false) : setIsShowSpinner(true);
    LoginSer.login(user)
      .then(async (res) => {
        let result = res;
        await AuthSer.login(result.data.body);
        dispatch(setEmail(result.data.body.email));
        dispatch(setFirstName(result.data.body.firstName));
        dispatch(setLastName(result.data.body.lastName));
        dispatch(setRole(result.data.body.roles.roleName));
        const permissions = mapPermissions(result.data.body.RolePermission);
        dispatch(setRolePermission(permissions));
        dispatch(
          setFullName(
            result.data.body.firstName + " " + result.data.body.lastName
          )
        );
        if (result.data.body.roles.roleName === "Admin") {
          dispatch(setAdmin(true));
        } else if (result.data.body.roles.roleName === "Super Admin") {
          dispatch(setSuperAdmin(true));
        } else {
          dispatch(setContributor(true));
        }

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
        ></Grid>
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
