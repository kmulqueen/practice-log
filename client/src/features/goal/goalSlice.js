import { createSlice } from "@reduxjs/toolkit";
import {
  createGoal,
  resetGoalSubmissionStatus,
  getUserGoals,
  setGoal,
} from "./goalActions";

export const goalSlice = createSlice({
  name: "goal",
  initialState: {
    currentGoal: {
      id: null,
      userId: null,
      instrumentId: null,
      name: "",
      description: "",
      targetTempo: 0,
      targetDuration: "0 days",
      dateCompleted: null,
      totalDuration: "0 days",
      tags: [],
      createdAt: "",
      updatedAt: "",
    },
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
    // SET GOAL
    [setGoal.pending]: (state) => {
      state.status = "pending";
    },
    [setGoal.fulfilled]: (state, { payload }) => {
      state.status = "retrieved";
      state.currentGoal = payload;
    },
    [setGoal.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export default goalSlice.reducer;
