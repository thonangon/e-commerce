import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,  
  error: null,
  favorites: [],
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
    addFavorite: (state, action) => {
      if (!state.favorites) state.favorites = []; // Ensure `favorites` is initialized
      const exists = state.favorites.some((product) => product.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
      }
      console.log('User state:', state.favorites); // For debugging purposes (remove before production)    
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites?.filter(
        (product) => product.id !== action.payload.id
      );
    },
    
    
  },
});

export const { registerSuccess, loginSuccess, registerError, logout,addFavorite, removeFavorite } = userSlice.actions;
export default userSlice.reducer;
