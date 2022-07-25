import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "store/auth-slice/auth-slice";
import userSlice from "store/user-slice/user-slice";
import toggleSlice from "store/toggle-slice/toggle-slice";

const rootReducer = combineReducers({
  authReducer: authSlice,
  userReducer: userSlice,
  toggleReducer: toggleSlice,
});

export const store = configureStore({ reducer: rootReducer });
