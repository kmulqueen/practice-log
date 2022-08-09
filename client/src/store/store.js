import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import goalReducer from "../features/goal/goalSlice";
import instrumentReducer from "../features/instrument/instrumentSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    goal: goalReducer,
    instrument: instrumentReducer,
  },
});
