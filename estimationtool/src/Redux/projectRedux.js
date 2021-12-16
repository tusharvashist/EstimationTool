import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    projectId: "",
    clientId: "",
  },
  reducers: {
    setProjectId: (state, projectId) => {
      state.projectId = projectId.payload;
    },
    setClientId: (state, clientId) => {
      state.clientId = clientId.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProjectId, setClientId } = projectSlice.actions;

export default projectSlice.reducer;
