import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import loginReducer from "./loginRedux";
import basicDetailReducer from "./basicDetailRedux";
import effortAttributeSave from "./effortAttributeSaveRedux";
import calcAttributeSave from "./CalcAttributeRedux";
import roleRedux from "./roleRedux";
import projectRedux from "./projectRedux";
import estimationHeaderId from "./estimationHeaderId";
import estimationPermission from "./estimationPermission";
import resourceMixReduxDataSave from "./resourcemixRedux";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const reducer = combineReducers({
  login: loginReducer,
  basicDetail: basicDetailReducer,
  effortAttribute: effortAttributeSave,
  calcAttribute: calcAttributeSave,
  role: roleRedux,
  project: projectRedux,
  estimationHeaderId: estimationHeaderId,
  resourceMixData: resourceMixReduxDataSave,
  estimationPermission: estimationPermission,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
