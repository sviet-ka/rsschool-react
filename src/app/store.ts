import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../features/products/products-api-slice';
import searchReducer from '../features/search/search-slice';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
