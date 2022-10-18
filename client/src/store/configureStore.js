import { configureStore } from "@reduxjs/toolkit";

import themeSlice from "./themeSlice";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    themeSlice,
    authSlice,
    productSlice,
    cartSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});

export default store;
