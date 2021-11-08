import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginRedux'
import basicDetailReducer from './basicDetailRedux'
import effortAttributeSave  from './effortAttributeSaveRedux'

export default configureStore({
  reducer: {
      login: loginReducer,  
      basicDetail: basicDetailReducer, 
      effortAttribute: effortAttributeSave
  },
})