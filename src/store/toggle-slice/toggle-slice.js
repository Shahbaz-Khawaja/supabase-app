import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lightTheme: true,
};

export const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.lightTheme = !state.lightTheme;
    },
  },
});

export const { toggleTheme } = toggleSlice.actions;
export default toggleSlice.reducer;
