import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleActionError } from "../../utils/handleActionError";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        "/api/users/login",
        { username, password },
        config
      );
      localStorage.setItem("practicelog_userInfo", JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      const message = handleActionError(error);
      return message;
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", () => {
  localStorage.removeItem("practicelog_userInfo");
  return { username: "", id: null, token: "" };
});
