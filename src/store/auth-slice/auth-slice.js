import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  user: {},
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logInUser: (state, action) => {
      state.user = action.payload;
    },

    logOutUser: (state) => {
      state.user = {};
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { logOutUser, logInUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
