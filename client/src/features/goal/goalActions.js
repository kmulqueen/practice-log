import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createGoal = createAsyncThunk(
  "goal/create",
  async (
    { instrumentId, name, targetTempo, targetDuration, tags },
    { getState }
  ) => {
    try {
      const { user } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const res = await axios.post(
        "/api/goals",
        { instrumentId, name, targetTempo, targetDuration, tags },
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

export const getUserGoals = createAsyncThunk(
  "goal/findUserGoals",
  async (_, { getState }) => {
    try {
      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.get(`/api/goals/user/${user.id}`, config);
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
