import { createSlice } from "@reduxjs/toolkit";

export const estimationHeaderId = createSlice({
  name: "estimationHeaderId",
  initialState: {
    estHeaderId: "",
  },
  reducers: {
    setEstHeaderId: (state, estHeaderId) => {
      state.estHeaderId = estHeaderId.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEstHeaderId } = estimationHeaderId.actions;

export default estimationHeaderId.reducer;
