import { createSlice } from "@reduxjs/toolkit";

export const toasterSlice = createSlice({
  name: "toaster",
  initialState: {
    open: false,
    message: "custom message",
    severity: "success",
    duration: 2000,
    positionVertical: "top",
    positionHorizontal: "right",
  },
  reducers: {
    openSuccessToasterWithMsg: (state, action) => {
      state.open = true;
      state.severity = "success";
      if (action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload.duration) {
        state.duration = action.payload.duration;
      }
      if (action.payload.positionVertical) {
        state.positionVertical = action.payload.positionVertical;
      }
      if (action.payload.positionHorizontal) {
        state.positionHorizontal = action.payload.positionHorizontal;
      }
    },
    openErrorToasterWithMsg: (state, action) => {
      state.open = true;
      state.severity = "error";
      if (action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload.duration) {
        state.duration = action.payload.duration;
      }
      if (action.payload.positionVertical) {
        state.positionVertical = action.payload.positionVertical;
      }
      if (action.payload.positionHorizontal) {
        state.positionHorizontal = action.payload.positionHorizontal;
      }
    },
    openWarningToasterWithMsg: (state, action) => {
      state.open = true;
      state.severity = "warning";
      if (action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload.duration) {
        state.duration = action.payload.duration;
      }
      if (action.payload.positionVertical) {
        state.positionVertical = action.payload.positionVertical;
      }
      if (action.payload.positionHorizontal) {
        state.positionHorizontal = action.payload.positionHorizontal;
      }
    },
    openInfoToasterWithMsg: (state, action) => {
      state.open = true;
      state.severity = "info";
      if (action.payload.message) {
        state.message = action.payload.message;
      }
      if (action.payload.duration) {
        state.duration = action.payload.duration;
      }
      if (action.payload.positionVertical) {
        state.positionVertical = action.payload.positionVertical;
      }
      if (action.payload.positionHorizontal) {
        state.positionHorizontal = action.payload.positionHorizontal;
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
