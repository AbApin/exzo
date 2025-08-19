import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './pages/products/productsSlice';
import { productsApi } from './features/products/productsApi';
import userReducer from './features/user/userSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch