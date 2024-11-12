import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/useSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // for React Native
import storage from 'redux-persist/lib/storage'; // for web
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage for React Native, or use storage for web
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
