import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleActionError } from "../../utils/handleActionError";

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
      const message = handleActionError(error);
      return message;
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
      const res = await axios.get(`/api/instruments/user`, config);
      return res.data;
    } catch (error) {
      const message = handleActionError(error);
      return message;
    }
  }
);

export const setInstrument = createAsyncThunk(
  "instrument/set",
  async (instrument, { rejectWithValue }) => {
    try {
      // If Instrument object is passed
      const instrumentKeys = Object.keys(instrument);
      const acceptedKeys = ["createdAt", "id", "name", "updatedAt", "userId"];
      // Verify instrument
      if (instrumentKeys.length !== 5) {
        rejectWithValue();
      } else {
        const verify = instrumentKeys.every((key) => {
          return acceptedKeys.indexOf(key) !== -1;
        });
        if (verify) {
          return instrument;
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

export const updateInstrument = createAsyncThunk(
  "instrument/update",
  async ({ name, id }, { getState }) => {
    const { user } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    const res = await axios.post(`/api/instruments/${id}`, { name }, config);
    if (res.status === 200) {
      return { name, id };
    } else {
      return res.data;
    }
  }
);
