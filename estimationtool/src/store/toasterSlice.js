import { createSlice } from "@reduxjs/toolkit";

export const toasterSlice = createSlice({
  name: "toaster",
  initialState: {
    open: false,
    message: "",
    severity: "success",
    duration: 2000,
  },
  reducers: {
    openSuccessToasterWithMsg: (state, action) => {
      state.open = true;
      state.severity = "success";
      state.message = action.payload;
    },
    openErrorToasterWithMsg: (state, action) => {
      state.open = true;
      state.severity = "error";
      if (action.payload) {
        state.message = action.payload;
      }
    },
    openWarningToasterWithMsg: (state, action) => {
      state.open = true;
      state.severity = "warning";
      if (action.payload) {
        state.message = action.payload;
      }
    },
    openInfoToasterWithMsg: (state, action) => {
      state.open = true;
      state.severity = "info";
      if (action.payload) {
        state.message = action.payload;
      }
    },
    closeToaster: (state) => {
      state.open = false;
    },
  },
});

export const {
  openSuccessToasterWithMsg,
  openErrorToasterWithMsg,
  openWarningToasterWithMsg,
  openInfoToasterWithMsg,
  closeToaster,
} = toasterSlice.actions;

export default toasterSlice.reducer;
