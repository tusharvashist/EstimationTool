import { createSlice } from "@reduxjs/toolkit";

export const basicDetailSlice = createSlice({
  name: "role",
  initialState: {
    isAdmin: false,
    isContributor: false,
    isSuperAdmin: false,
  },
  reducers: {
    setAdmin: (state, isAdmin) => {
      state.isAdmin = isAdmin.payload;
    },
    setContributor: (state, isContributor) => {
      state.isContributor = isContributor.payload;
    },
    setSuperAdmin: (state, isSuperAdmin) => {
      state.isSuperAdmin = isSuperAdmin.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAdmin, setContributor, setSuperAdmin } =
  basicDetailSlice.actions;

export default basicDetailSlice.reducer;
