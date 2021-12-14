import { createSlice } from '@reduxjs/toolkit'

export const resourceMixReduxDataSave = createSlice({
    name: 'resourceMixData',
    initialState:
    {
           data:[]
    },
    reducers: {
        setResourceMixData: (state, data) => {
            state.data = data.payload;
        }

    },
})

// Action creators are generated for each case reducer function
export const { setResourceMixData } = resourceMixReduxDataSave.actions

export default resourceMixReduxDataSave.reducer