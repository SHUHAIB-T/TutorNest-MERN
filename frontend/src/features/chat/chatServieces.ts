import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/api";
import { AxiosError } from "axios";

export const getAllChats = createAsyncThunk(
  "chat/getAllchat",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/chat", { withCredentials: true });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const Error = (axiosError?.response?.data as { message: string }).message;
      const payload = {
        error: Error,
        statusCode: axiosError.status,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);
