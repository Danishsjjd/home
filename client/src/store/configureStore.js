import authSlice from "./authSlice"
import cartSlice from "./cartSlice"
import productSlice from "./productSlice"
import themeSlice from "./themeSlice"

import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    themeSlice,
    authSlice,
    productSlice,
    cartSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
})

export default store
