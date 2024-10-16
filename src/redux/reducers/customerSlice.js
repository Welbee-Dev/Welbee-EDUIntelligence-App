import {createSlice} from '@reduxjs/toolkit'
import {CUSTOMER_TYPE} from '../../utils/constants'

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    // name: 'The Two Counties Trust',
    // customerType: CUSTOMER_TYPE.MAT,
    // id: 2,
  },
  reducers: {
    getCustomer: state => {
      return state.user
    },
    updateCustomer: (state, action) => {
      state.name = action.payload.name
      state.customerType = action.payload.customerType
      state.id = action.payload.id
    },
  },
})

export const {getCustomer, updateCustomer} = customerSlice.actions
export default customerSlice.reducer
