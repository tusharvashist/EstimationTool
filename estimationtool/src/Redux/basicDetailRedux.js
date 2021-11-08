import { createSlice } from '@reduxjs/toolkit'

export const basicDetailSlice = createSlice({
  name: 'basicDetail',
  initialState: {
      estimationName: '',
      estimationType: '',
      estimationTypeId: '',
      efforUnit: '',
      esttimationDesc: '',
      estimationHeaderId: '',
  },
  reducers: {
    setEstimationName: (state, estimationName) => {
      state.estimationName = estimationName.payload;
      },
    setEstimationType: (state, estimationType) => {
        state.estimationType = estimationType.payload;
        },
    setEstimationTypeId: (state, estimationTypeId) => {
       state.estimationTypeId = estimationTypeId.payload;
            },
    setEfforUnit: (state, efforUnit) => {
      state.efforUnit = efforUnit.payload;
                },
     setEsttimationDesc: (state, esttimationDesc) => {
                    state.esttimationDesc = esttimationDesc.payload;
                    },
                    setEstimationHeaderId: (state, estimationHeaderId) => {
                      state.estimationHeaderId = estimationHeaderId.payload;
                      },   
   
  },
})

// Action creators are generated for each case reducer function
export const { setEstimationName,setEstimationType, setEstimationTypeId,setEfforUnit,setEsttimationDesc} = basicDetailSlice.actions

export default basicDetailSlice.reducer