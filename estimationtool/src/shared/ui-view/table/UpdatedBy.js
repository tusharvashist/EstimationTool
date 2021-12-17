import React from "react";
import classes from "./UpdatedBy.module.css";
import { getMMDDYYYYFormat } from "../../../common/dateTools";

const UpdatedBy = (props) => {
  return (
    <>
      <p className={classes.updatedName}>
        {props.firstName} {props.lastName}
      </p>
      <p className={classes.updatedDate}>
        {getMMDDYYYYFormat(props.updatedAt)}
      </p>
    </>
  );
};

export default UpdatedBy;
