import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import goalReducer from "../features/goal/goalSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    goal: goalReducer,
  },
});
