import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./userActions";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    id: null,
  },
  reducers: {},
  extraReducers: {
    // LOGIN
    [loginUser.fulfilled]: (state, { payload }) => {
      state.username = payload.username;
      state.id = payload.id;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
