import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    id: null,
  },
  reducers: {
    login: (state, action) => {
      state = action.payload;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
