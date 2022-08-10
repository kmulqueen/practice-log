import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import goalReducer from "../features/goal/goalSlice";
import instrumentReducer from "../features/instrument/instrumentSlice";
import tagReducer from "../features/tag/tagSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    goal: goalReducer,
    instrument: instrumentReducer,
    tag: tagReducer,
  },
});
