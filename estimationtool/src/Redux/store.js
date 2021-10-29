import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './loginRedux'

export default configureStore({
  reducer: {
      login: loginReducer,
      
  },
})