import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createGoal = createAsyncThunk(
  "goal/create",
  async ({ userId, name, targetTempo, targetDuration, tags }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        "/api/goals",
        { userId, name, targetTempo, targetDuration, tags },
        config
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

export const resetGoalSubmissionStatus = createAsyncThunk(
  "goal/resetSubmissionStatus",
  async () => {
    return "";
  }
);
