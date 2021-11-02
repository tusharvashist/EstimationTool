import { createSlice } from '@reduxjs/toolkit'

export const projectSlice = createSlice({
  name: 'project',
  initialState: {
      projectName: '',
      projectDescription: '',
      domain: ''
  },
  reducers: {
    setProjectName: (state, projectName) => {
      state.projectName = projectName.payload;
      },
    setProjectDescription: (state, projectDescription) => {
        state.projectDescription = projectDescription.payload;
        },
    setDomain: (state, domain) => {
       state.domain = domain.payload;
            }

   
  },
})

// Action creators are generated for each case reducer function
export const { setProjectName, setProjectDescription, setDomain } = projectSlice.actions

export default projectSlice.reducer