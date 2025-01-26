import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './slice/registrationSlice';

const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
});

export default store;
