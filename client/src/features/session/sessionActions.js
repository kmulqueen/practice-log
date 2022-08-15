import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleActionError } from "../../utils/handleActionError";

export const createSession = createAsyncThunk(
  "session/create",
  async (
    { exercise, goalId, instrumentId, tempo, duration, tags },
    { getState }
  ) => {
    const { user } = getState();
    const userId = parseInt(user.id);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    const res = await axios.post(
      "/api/practiceitems",
      { exercise, goalId, userId, instrumentId, tempo, duration, tags },
      config
    );
    return res.data;
  }
);

export const resetSessionSubmissionStatus = createAsyncThunk(
  "session/resetSubmissionStatus",
  async () => {
    return "";
  }
);

export const getUserSessions = createAsyncThunk(
  "session/findUserSessions",
  async (_, { getState }) => {
    try {
      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.get(`/api/practiceitems/user/${user.id}`, config);
      return res.data;
    } catch (error) {
      const message = handleActionError(error);
      return message;
    }
  }
);

export const setSession = createAsyncThunk(
  "session/set",
  async (session, { rejectWithValue }) => {
    try {
      // If Session object is passed
      const sessionKeys = Object.keys(session);
      const acceptedKeys = [
        "createdAt",
        "id",
        "userId",
        "goalId",
        "instrumentId",
        "exercise",
        "tempo",
        "duration",
        "tags",
      ];
      // Verify session
      if (sessionKeys.length !== acceptedKeys.length) {
        rejectWithValue();
      } else {
        const verify = sessionKeys.every((key) => {
          return acceptedKeys.indexOf(key) !== -1;
        });
        if (verify) {
          return session;
        } else {
          rejectWithValue();
        }
      }
    } catch (error) {
      const message = handleActionError(error);
      return message;
    }
  }
);
