import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", () => {
  localStorage.removeItem("practicelog_userInfo");
  return { username: "", id: null, token: "" };
});
