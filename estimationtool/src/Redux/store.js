import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginRedux'
import basicDetailReducer from './basicDetailRedux'

export default configureStore({
  reducer: {
      login: loginReducer,
      basicDetail: basicDetailReducer, 
      
  },
})