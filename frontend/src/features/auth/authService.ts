import { userData } from "../../types/authTypes";
import api from "../../API/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userdata: userData, thunkAPI) => {
    try {
      const response = await api.post("/signup", userdata);
      console.log(response);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError.message);
    }
  }
);
