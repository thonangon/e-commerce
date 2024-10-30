// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './useSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
