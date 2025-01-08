import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "./slices/Cart.slice";
import { authReducer } from "./slices/Auth.slice";
import deliveryReducer from "./slices/deliverySlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth", "delivery"], // Add delivery to the whitelist
};

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  delivery: deliveryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
