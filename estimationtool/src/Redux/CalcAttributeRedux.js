import { createSlice } from '@reduxjs/toolkit'

export const calcAttributeSave = createSlice({
    name: 'calcAttribute',
    initialState:
    {
           data:[]
    },
    reducers: {
        setCalcAttributeData: (state, data) => {
            state.data = data.payload;
        }

    },
})

// Action creators are generated for each case reducer function
export const { setCalcAttributeData } = calcAttributeSave.actions

export default calcAttributeSave.reducer