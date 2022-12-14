import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import classes from "./Status.module.css";
import { FiCheck } from "react-icons/fi";
import usePermission from "../hooks/usePermissions";

const Status = (props) => {
  const { estimation_versioning } = usePermission();
  return (
    <div className={classes.statusbackground}>
      <div className={classes.left_content}>
        <IoMdCheckmarkCircleOutline />
        <div className={classes.message}>Estimation Relased</div>
      </div>
      {estimation_versioning && (
        <div className={classes.right_content}>
          <div className={classes.cta_tagline}>{props.data}</div>
          <button
            className={classes.status_button}
            onClick={props.onClickButton}
          >
            <FiCheck /> Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Status;
