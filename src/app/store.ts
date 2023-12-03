import { configureStore } from '@reduxjs/toolkit';
import countryReducer from '../features/countries/countries-slice';
import userReducer from '../features/users/users-slice';

export const store = configureStore({
  reducer: {
    countries: countryReducer,
    users: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
