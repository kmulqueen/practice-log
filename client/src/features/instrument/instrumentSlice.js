import { createSlice } from "@reduxjs/toolkit";
import {
  getUserInstruments,
  createInstrument,
  resetInstrumentSubmissionStatus,
  setInstrument,
  updateInstrument,
} from "./instrumentActions";

export const instrumentSlice = createSlice({
  name: "instrument",
  initialState: {
    currentInstrument: {
      id: null,
      name: "",
    },
    status: "",
    userInstruments: [],
  },
  reducers: {},
  extraReducers: {
    // CREATE INSTRUMENT
    [createInstrument.pending]: (state) => {
      state.status = "pending";
    },
    [createInstrument.fulfilled]: (state) => {
      state.status = "created";
    },
    [createInstrument.rejected]: (state) => {
      state.status = "error";
    },
    // RESET SUBMISSION STATUS
    [resetInstrumentSubmissionStatus.fulfilled]: (state, { payload }) => {
      state.status = payload;
    },
    // GET USER INSTRUMENTS
    [getUserInstruments.pending]: (state) => {
      state.status = "pending";
    },
    [getUserInstruments.fulfilled]: (state, { payload }) => {
      state.status = "retrieved";
      state.userInstruments = payload;
    },
    [getUserInstruments.rejected]: (state) => {
      state.status = "error";
    },
    // SET INSTRUMENT
    [setInstrument.pending]: (state) => {
      state.status = "pending";
    },
    [setInstrument.fulfilled]: (state, { payload }) => {
      state.status = "retrieved";
      state.currentInstrument.id = payload.id;
      state.currentInstrument.name = payload.name;
    },
    [setInstrument.rejected]: (state) => {
      state.status = "error";
    },
    // UPDATE INSTRUMENT
    [updateInstrument.pending]: (state) => {
      state.status = "pending";
    },
    [updateInstrument.fulfilled]: (state, { payload }) => {
      state.status = "updated";
      state.currentInstrument.id = payload.id;
      state.currentInstrument.name = payload.name;
    },
    [updateInstrument.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export default instrumentSlice.reducer;
