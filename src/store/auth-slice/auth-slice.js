import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  user: {
    id: "",
    email: "",
    role: "",
    priority: "",
    previousStatus: "",
    currentStatus: "",
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logInUser: (state, action) => {
      state.user = action.payload;
    },
    updateCurrentUserStatus: (state, action) => {
      state.user.currentStatus = action.payload;
    },
    logOutUser: (state) => {
      state.user.id = "";
      state.user.email = "";
      state.user.role = "";
      state.user.priority = "";
      state.user.previousStatus = "";
      state.user.currentStatus = "";
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { logOutUser, logInUser, updateCurrentUserStatus, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
