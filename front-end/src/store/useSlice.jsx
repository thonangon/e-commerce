import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,  // New field to store admin status
  error: null,
  addFavoriteProduct:null,
  removeFavoriteProduct:null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.is_admin || false;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.is_admin || false;
      state.error = null;
    },
    registerError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
    addFavoriteProduct: (state,action) => {
      state.user = action.payload.user
      state.addFavoriteProduct = true;

    },
    removeFavoriteProduct: (state,action) => {
      state.user = action.payload.user;
      state.removeFavoriteProduct = true;
    },
  },
});

export const { registerSuccess, loginSuccess, registerError, logout } = userSlice.actions;
export default userSlice.reducer;
