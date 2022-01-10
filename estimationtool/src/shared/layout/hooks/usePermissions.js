import React from "react";
import { useSelector } from "react-redux";

const usePermission = () => {
 return  useSelector((state) => state.login.permissions) || {};
};

export default usePermission;
