import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authReducer";
import walletsReducer from "./slices/walletsReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        wallets: walletsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type StoreType = typeof store;

export default store;
