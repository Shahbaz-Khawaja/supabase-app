import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "store/auth-slice/auth-slice";
import userSlice from "store/user-slice/user-slice";

const rootReducer = combineReducers({
  authReducer: authSlice,
  userReducer: userSlice,
});

export const store = configureStore({ reducer: rootReducer });
