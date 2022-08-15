import { createSlice } from "@reduxjs/toolkit";
import {
  createSession,
  resetSessionSubmissionStatus,
  getUserSessions,
  setSession,
} from "./sessionActions";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    currentSession: {
      id: null,
      userId: null,
      goalId: null,
      instrumentId: null,
      exercise: "",
      tempo: 0,
      duration: "",
      createdAt: "",
      tags: [],
    },
    status: "",
    userSessions: [],
  },
  reducers: {},
  extraReducers: {
    // CREATE SESSION
    [createSession.pending]: (state) => {
      state.status = "pending";
    },
    [createSession.fulfilled]: (state) => {
      state.status = "created";
    },
    [createSession.rejected]: (state) => {
      state.status = "error";
    },
    // RESET SUBMISSION STATUS
    [resetSessionSubmissionStatus.fulfilled]: (state, { payload }) => {
      state.status = payload;
    },
    // GET USER SESSIONS
    [getUserSessions.pending]: (state) => {
      state.status = "pending";
    },
    [getUserSessions.fulfilled]: (state, { payload }) => {
      state.status = "retrieved";
      state.userSessions = payload;
    },
    [getUserSessions.rejected]: (state) => {
      state.status = "error";
    },
    // SET SESSION
    [setSession.pending]: (state) => {
      state.status = "pending";
    },
    [setSession.fulfilled]: (state, { payload }) => {
      state.status = "retrieved";
      const {
        exercise,
        id,
        userId,
        goalId,
        instrumentId,
        tempo,
        duration,
        tags,
        createdAt,
      } = payload;
      state.currentSession.id = id;
      state.currentSession.userId = userId;
      state.currentSession.goalId = goalId;
      state.currentSession.instrumentId = instrumentId;
      state.currentSession.exercise = exercise;
      state.currentSession.tempo = tempo;
      state.currentSession.duration = duration;
      state.currentSession.tags = tags;
      state.currentSession.createdAt = createdAt;
    },
    [setSession.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export default sessionSlice.reducer;
