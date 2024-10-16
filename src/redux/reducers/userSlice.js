import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: 1,
    name: 'Amna Mosin',
    isMat: true,
    email: '',
  },
  reducers: {
    getUser: state => {
      debugger
      if (state.user) return state.user
      else return localStorage.getItem('user')
    },
    updateUser: (state, action) => {
      state.name = action.payload.name
      state.isMat = action.payload.isMat
      state.email = action.payload.email
    },
  },
})

export const {getUser, updateUser} = userSlice.actions
export default userSlice.reducer
