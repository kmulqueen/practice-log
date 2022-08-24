import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleActionError } from "../../utils/handleActionError";

export const createGoal = createAsyncThunk(
  "goal/create",
  async (
    { instrumentId, name, targetTempo, targetDuration, tags, description },
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
        { instrumentId, name, targetTempo, targetDuration, tags, description },
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
    const { user } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.get(`/api/goals/user`, config);
    return res.data;
  }
);

export const setGoal = createAsyncThunk(
  "goal/set",
  async (goal, { rejectWithValue }) => {
    // If Instrument object is passed
    const goalKeys = Object.keys(goal);
    const acceptedKeys = [
      "createdAt",
      "id",
      "name",
      "description",
      "updatedAt",
      "userId",
      "instrumentId",
      "targetTempo",
      "targetDuration",
      "dateCompleted",
      "totalDuration",
      "tags",
    ];
    // Verify instrument
    if (goalKeys.length !== acceptedKeys.length) {
      rejectWithValue();
    } else {
      const verify = goalKeys.every((key) => {
        return acceptedKeys.indexOf(key) !== -1;
      });
      if (verify) {
        return goal;
      } else {
        rejectWithValue();
      }
    }
  }
);
