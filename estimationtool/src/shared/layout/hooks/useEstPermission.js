import React from "react";
import { useSelector } from "react-redux";

const useEstPermission = () => {
  return useSelector((state) => state.estimationPermission) || [];
};

export default useEstPermission;
