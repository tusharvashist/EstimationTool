import { createSlice } from '@reduxjs/toolkit'

export const effortAttributeSave = createSlice({
    name: 'effortAttribute',
    initialState:
    {
           data:[]
    },
    reducers: {
        setEstAttributeData: (state, data) => {
            state.data = data.payload;
        }

    },
})

// Action creators are generated for each case reducer function
export const { setEstAttributeData } = effortAttributeSave.actions

export default effortAttributeSave.reducer