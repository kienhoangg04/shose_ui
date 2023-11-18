import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slides/userSlides';
import orderReducer from './slides/orderSlides';

export const store = configureStore({
    reducer: {
        user: userReducer,
        order: orderReducer,
    },
});
