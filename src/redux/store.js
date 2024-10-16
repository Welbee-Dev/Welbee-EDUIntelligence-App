import {configureStore} from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import customerReducer from './reducers/customerSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    customer: customerReducer,
  },
})
