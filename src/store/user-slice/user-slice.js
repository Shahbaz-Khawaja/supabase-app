import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
  allUsers: [],
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    getUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    inviteUser: (state, action) => {
      state.allUsers.push(action.payload);
    },
    setUsersList: (state, action) => {
      state.allUsers = [...action.payload];
    },
  },
});

export const { inviteUser, setUsersList, getUserDetails } = userSlice.actions;
export default userSlice.reducer;
