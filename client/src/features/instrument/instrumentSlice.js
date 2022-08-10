import { createSlice } from "@reduxjs/toolkit";
import {
  getUserInstruments,
  createInstrument,
  resetInstrumentSubmissionStatus,
} from "./instrumentActions";

export const instrumentSlice = createSlice({
  name: "instrument",
  initialState: {
    id: null,
    name: "",
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
  },
});

export default instrumentSlice.reducer;
