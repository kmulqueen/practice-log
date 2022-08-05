import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./userActions";

// Retrieve any existing user info from local storage (if exists)
const userInfoFromStorage = localStorage.getItem("practicelog_userInfo")
  ? JSON.parse(localStorage.getItem("practicelog_userInfo"))
  : { username: "", id: null, token: "" };

export const userSlice = createSlice({
  name: "user",
  initialState: userInfoFromStorage,
  reducers: {},
  extraReducers: {
    // LOGIN
    [loginUser.fulfilled]: (state, { payload }) => {
      state.username = payload.username;
      state.id = payload.id;
      state.token = payload.token;
    },
    // LOGOUT
    [logoutUser.fulfilled]: (state, { payload }) => {
      state.username = payload.username;
      state.id = payload.id;
      state.token = payload.token;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
