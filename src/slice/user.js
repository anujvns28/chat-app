import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  signupData : null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSignupData : (state,action) =>{
      state.signupData = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSignupData} = userSlice.actions

export default userSlice.reducer