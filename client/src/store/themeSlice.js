import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  theme: {
    h: 19,
    s: 81,
    l: 54,
  },
  dark: false,
}

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setDark: (state, action) => {
      state.dark = action.payload
    },
  },
})

export const { setTheme, setDark } = themeSlice.actions

export const getTheme = (state) => state.themeSlice.theme
export const getDark = (state) => state.themeSlice.dark

export default themeSlice.reducer
