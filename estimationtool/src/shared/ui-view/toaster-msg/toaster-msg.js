import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeToaster } from "../../../store/toasterSlice";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";

export default function GlobalTosterMsg() {
  const isShowSnackbar = useSelector((state) => state.toaster.open);
  const message = useSelector((state) => state.toaster.message);
  const duration = useSelector((state) => state.toaster.duration);
  const severity = useSelector((state) => state.toaster.severity);
  const positionVertical = useSelector(
    (state) => state.toaster.positionVertical
  );
  const positionHorizontal = useSelector(
    (state) => state.toaster.positionHorizontal
  );

  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeToaster());
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: positionVertical,
          horizontal: positionHorizontal,
        }}
        autoHideDuration={duration}
        open={isShowSnackbar}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Alert variant="filled" onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
