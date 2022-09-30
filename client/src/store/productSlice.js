import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productCount: 0,
};

const productSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = action.payload;
    },
    setProductCount: (state, action) => {
      state.productCount = action.payload;
    },
  },
});

export const { addProduct, setProductCount } = productSlice.actions;

export const getProducts = (store) => store.productSlice.products;
export const getProductsCount = (store) => store.productSlice.productCount;

export default productSlice.reducer;
