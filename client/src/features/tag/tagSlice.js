import { createSlice } from "@reduxjs/toolkit";
import { createTag, getUserTags, resetTagSubmissionStatus } from "./tagActions";

export const tagSlice = createSlice({
  name: "tag",
  initialState: {
    id: null,
    name: "",
    status: "",
    userTags: [],
  },
  reducers: {},
  extraReducers: {
    // CREATE TAG
    [createTag.pending]: (state) => {
      state.status = "pending";
    },
    [createTag.fulfilled]: (state, { payload }) => {
      state.status = "created";
      state.userTags.push(payload);
    },
    [createTag.rejected]: (state) => {
      state.status = "error";
    },
    // RESET SUBMISSION STATUS
    [resetTagSubmissionStatus.fulfilled]: (state, { payload }) => {
      state.status = payload;
    },
    // GET USER TAGS
    [getUserTags.pending]: (state) => {
      state.status = "pending";
    },
    [getUserTags.fulfilled]: (state, { payload }) => {
      state.status = "retrieved";
      state.userTags = payload;
    },
    [getUserTags.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export default tagSlice.reducer;
