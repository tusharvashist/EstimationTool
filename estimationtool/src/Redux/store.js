import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginRedux";
import basicDetailReducer from "./basicDetailRedux";
import effortAttributeSave from "./effortAttributeSaveRedux";
import calcAttributeSave from "./CalcAttributeRedux";
import roleRedux from "./roleRedux";

export default configureStore({
  reducer: {
    login: loginReducer,
    basicDetail: basicDetailReducer,
    effortAttribute: effortAttributeSave,
    calcAttribute: calcAttributeSave,
    role: roleRedux,
  },
});
