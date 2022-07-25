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
    updateUserStatusFromList: (state, action) => {
      state.allUsers.forEach((user) => {
        if (user.id === action.payload.id) {
          user.currentStatus = action.payload.status;
        }
      });
    },
    deleteUser: (state, action) => {
      state.allUsers.forEach((user, index) => {
        if (user.id === action.payload) {
          return state.allUsers.splice(index, 1);
        }
      });
    },
  },
});

export const {
  inviteUser,
  setUsersList,
  getUserDetails,
  deleteUser,
  updateUserStatusFromList,
} = userSlice.actions;
export default userSlice.reducer;
