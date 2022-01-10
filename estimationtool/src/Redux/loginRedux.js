import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    firstName: "",
    lastName: "",
    fullName: "",
    role: "",
    permissions: []
    // email: localStorage.email,
    // firstName: localStorage.firstName,
    // lastName: localStorage.lastName,
    // fullName:localStorage.fullName,
    // role: localStorage.role
  },
  reducers: {
    setEmail: (state, email) => {
      state.email = email.payload;
      // localStorage.setItem("email", email.payload);
    },
    setFirstName: (state, firstName) => {
      state.firstName = firstName.payload;
      // localStorage.setItem("firstName", firstName.payload);
    },
    setLastName: (state, lastName) => {
      state.lastName = lastName.payload;
      // localStorage.setItem("lastName", lastName.payload);
    },
    setFullName: (state, fullName) => {
      state.fullName = fullName.payload;
    },
    setRole: (state, role) => {
      state.role = role.payload;
      // localStorage.setItem("role", role.payload);
    },
    setRolePermission: (state, permissions) => {
      state.permissions = permissions.payload;
      // localStorage.setItem("role", role.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmail, setFirstName, setLastName, setFullName, setRole, setRolePermission } =
  loginSlice.actions;

export default loginSlice.reducer;
