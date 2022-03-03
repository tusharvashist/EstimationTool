import React from "react";
import { useSelector } from "react-redux";

const useEstPermission = () => {
  return useSelector((state) => state.estimationPermission.estPermission);
};

export default useEstPermission;
