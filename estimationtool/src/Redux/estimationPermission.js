import { createSlice } from "@reduxjs/toolkit";

export const estimationPermission = createSlice({
  name: "estimationPermission",
  initialState: {
    estPermission: "",
  },
  reducers: {
    setEstPermission: (state, estPermission) => {
      state.estPermission = estPermission.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEstPermission } = estimationPermission.actions;

export default estimationPermission.reducer;
