import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  accountUser: null,
  userId: null,
  tokenUser: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      const { accountUser, tokenUser } = action.payload;
      state.accountUser = accountUser;
      state.userId = accountUser ? accountUser.id : null;
      state.tokenUser = tokenUser;

      AsyncStorage.setItem("userAccount", JSON.stringify(accountUser));
      AsyncStorage.setItem("id", accountUser?.id.toString());
      AsyncStorage.setItem("tokenUser", tokenUser);
    },
    clearUser(state) {
      state.accountUser = null;
      state.userId = null;
      state.tokenUser = null;
      AsyncStorage.clear();
    },
    loadUser(state, action) {
      const { accountUser, userId, tokenUser } = action.payload;
      state.accountUser = accountUser;
      state.userId = userId;
      state.tokenUser = tokenUser;
    },
  },
});

export const { setUser, clearUser, loadUser } = authSlice.actions;
export default authSlice.reducer;
