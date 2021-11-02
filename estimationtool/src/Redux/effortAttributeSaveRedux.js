import { createSlice } from '@reduxjs/toolkit'

export const effortAttributeSave = createSlice({
    name: 'effortAttribute',
    initialState:
    {
            estAttributeId: '',
            estHeaderId: ''
        
    },
    reducers: {
        setEstAttributeId: (state, estAttributeId) => {
            state.estAttributeId = estAttributeId.payload;
        },
        setEstHeaderId: (state, estHeaderId) => {
            state.estHeaderId = estHeaderId.payload;
        },

    },
})

// Action creators are generated for each case reducer function
export const { setEstAttributeId, setEstHeaderId } = effortAttributeSave.actions

export default effortAttributeSave.reducer