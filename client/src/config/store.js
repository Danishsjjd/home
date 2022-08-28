import { configureStore } from "@reduxjs/toolkit";

import themeSlice from "../store/themeSlice";
import authSlice from "../store/authSlice";
import productSlice from "../store/productSlice";
import cartSlice from "../store/cartSlice";

const store = configureStore({
	reducer: {
		themeSlice,
		authSlice,
		productSlice,
		cartSlice,
	},
});

export default store;
