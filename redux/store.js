import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart";
import sessionReducer from "./slices/session";
import toastReducer from "./slices/toast";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    session: sessionReducer,
    toast: toastReducer,
  },
});
