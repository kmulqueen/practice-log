import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createInstrument = createAsyncThunk(
  "instrument/create",
  async ({ name }, { getState }) => {
    try {
      const { user } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const res = await axios.post(
        "/api/instruments",
        { userId: user.id, name },
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

export const resetInstrumentSubmissionStatus = createAsyncThunk(
  "instrument/resetSubmissionStatus",
  async () => {
    return "";
  }
);

export const getUserInstruments = createAsyncThunk(
  "instrument/findUserGoals",
  async (_, { getState }) => {
    try {
      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.get(`/api/instruments/user/${user.id}`, config);
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
