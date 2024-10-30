// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    isAuthenticated: false,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserInfo, logoutUser } = userSlice.actions;
export default userSlice.reducer;

