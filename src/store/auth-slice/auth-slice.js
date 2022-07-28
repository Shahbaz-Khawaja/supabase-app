import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  user: {
    id: "",
    email: "",
    role: "",
    priority: "",
    avatarURL: "",
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
    updateUserProfile: (state, action) => {
      state.user.avatarURL = action.payload;
    },
    logOutUser: (state) => {
      state.user.id = "";
      state.user.email = "";
      state.user.role = "";
      state.user.priority = "";
      state.user.previousStatus = "";
      state.user.currentStatus = "";
      state.user.avatarURL = "";
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  logOutUser,
  logInUser,
  updateCurrentUserStatus,
  updateUserProfile,
  setLoading,
} = authSlice.actions;
export default authSlice.reducer;
