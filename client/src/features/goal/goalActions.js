import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleActionError } from "../../utils/handleActionError";

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
      const message = handleActionError(error);
      return message;
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
      const res = await axios.get(`/api/goals/user`, config);
      return res.data;
    } catch (error) {
      const message = handleActionError(error);
      return message;
    }
  }
);
