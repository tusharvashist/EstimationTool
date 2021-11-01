import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
      email: localStorage.email,
      firstName: localStorage.firstName,
      lastName: localStorage.lastName,
      fullName:localStorage.fullName,
  },
  reducers: {
    setEmail: (state, email) => {
      state.email = email.payload;
        localStorage.setItem('email', email.payload);
      },
    setFirstName: (state,firstName) => {
      state.firstName = firstName.payload;
       localStorage.setItem('firstName', firstName.payload);
      },
    setLastName: (state, lastName) => {
      state.lastName = lastName.payload;
       localStorage.setItem('lastName', lastName.payload);
      },
     setFullName: (state, fullName) => {
       state.fullName = fullName.payload;
        localStorage.setItem('fullName', fullName.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEmail,setFirstName, setLastName,setFullName} = loginSlice.actions

export default loginSlice.reducer