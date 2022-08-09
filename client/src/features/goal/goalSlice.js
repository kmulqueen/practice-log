import { createSlice } from "@reduxjs/toolkit";
import {
  createGoal,
  resetGoalSubmissionStatus,
  getUserGoals,
} from "./goalActions";

export const goalSlice = createSlice({
  name: "goal",
  initialState: {
    id: null,
    userId: null,
    name: "",
    targetTempo: 0,
    targetDuration: "0 days",
    dateCompleted: null,
    totalDuration: "0 days",
    tags: [],
    status: "",
    userGoals: [],
  },
  reducers: {},
  extraReducers: {
    // CREATE GOAL
    [createGoal.pending]: (state) => {
      state.status = "pending";
    },
    [createGoal.fulfilled]: (state) => {
      state.status = "created";
    },
    [createGoal.rejected]: (state) => {
      state.status = "error";
    },
    // RESET SUBMISSION STATUS
    [resetGoalSubmissionStatus.fulfilled]: (state, { payload }) => {
      state.status = payload;
    },
    // GET USER GOALS
    [getUserGoals.pending]: (state) => {
      state.status = "pending";
    },
    [getUserGoals.fulfilled]: (state, { payload }) => {
      state.status = "retrieved";
      state.userGoals = payload;
    },
    [getUserGoals.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export default goalSlice.reducer;
