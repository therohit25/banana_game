import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../features/LoginLogout';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
