import { createSlice } from '@reduxjs/toolkit'

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
      clientName: '',
      website: '',
      description: ''

  },
  reducers: {
    setClientName: (state, clientName) => {
      state.clientName = clientName.payload;
      },
    setWebsite: (state, website) => {
        state.website = website.payload;
        },
    setDescription: (state, description) => {
       state.description = description.payload;
            },
  
   
  },
})

// Action creators are generated for each case reducer function
export const { setClientName,setWebsite, setDescription} = clientSlice.actions

export default clientSlice.reducer