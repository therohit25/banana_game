import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
  loggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.value = null;
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
