import { configureStore } from "@reduxjs/toolkit";
import toasterReducer from "./toasterSlice";

export default configureStore({
  reducer: {
    toaster: toasterReducer,
  },
});
