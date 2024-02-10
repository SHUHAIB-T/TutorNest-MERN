import { userData, LoginCredentials, Google } from "../../types/authTypes";
import api from "../../API/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userdata: userData, thunkAPI) => {
    try {
      const response = await api.post("/signup", userdata);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const Error = (axiosError?.response?.data as { message: string }).message;
      return thunkAPI.rejectWithValue(Error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData: LoginCredentials, thunkAPI) => {
    try {
      const response = await api.post("/login", formData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const Error = (axiosError?.response?.data as { message: string }).message;
      return thunkAPI.rejectWithValue(Error);
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (userData: Google, thunkAPI) => {
    try {
      const response = await api.post("/googleAuth", userData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      const Error = (axiosError?.response?.data as { message: string }).message;
      return thunkAPI.rejectWithValue(Error);
    }
  }
);
