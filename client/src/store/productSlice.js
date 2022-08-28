import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
};

const productSlice = createSlice({
	name: "ProductSlice",
	initialState,
	reducers: {
		addProduct: (state, action) => {
			state.products = action.payload;
		},
	},
});

export const { addProduct } = productSlice.actions;

export const getProducts = (store) => store.productSlice.products;

export default productSlice.reducer;
