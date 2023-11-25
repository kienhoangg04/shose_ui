import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slides/userSlides';
import orderReducer from './slides/orderSlides';
import productReducer from './slides/productSlides';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['user', 'product'],
};

const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer,
    product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
