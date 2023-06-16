import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload
    },
  },
})

export const { setCart } = cartSlice.actions

export const getCart = (state) => state.cartSlice.cart

export default cartSlice.reducer
