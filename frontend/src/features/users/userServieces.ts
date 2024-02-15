import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/api";
import { AxiosError } from "axios";
import { storage } from "../../app/fireabse";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const user = JSON.parse(localStorage.getItem("user") as string);
import { studentProfile } from "../../types/userTypes";

export const getStudentProfile = createAsyncThunk(
  "userProfile/getStudentprofile",
  async (_, thunkAPI) => {
    try {
      if (user.role === "STUDENT") {
        const response = await api.get("/student", {
          withCredentials: true,
        });
        return response.data;
      } else if (user.role === "TUTOR") {
        const response = await api.get("/tutor", {
          withCredentials: true,
        });
        return response.data;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const Error = (axiosError?.response?.data as { message: string }).message;
      const payload = {
        message: Error || axiosError.message,
        status: axiosError.status,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

export const uploadProfile = createAsyncThunk(
  "userProfile/uploadProfile",
  async (file: File, thunkAPI) => {
    try {
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, "profile/" + filename);
      const snapshot = await uploadBytes(storageRef, file);
      if (snapshot) {
        const url = await getDownloadURL(storageRef);
        let response;
        if (user.role === "STUDENT") {
          response = await api.patch(
            "/student/updateProfilePicture",
            { url },
            { withCredentials: true }
          );
        } else if (user.role === "TUTOR") {
          response = await api.patch(
            "/tutor/updateProfilePicture",
            { url },
            { withCredentials: true }
          );
        }
        return response?.data;
      }
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

export const updateProfile = createAsyncThunk(
  "userProfile/updateProfile",
  async (data: studentProfile, thunkAPI) => {
    try {
      if (user.role === "STUDENT") {
        const response = await api.post(
          "/student",
          { data },
          { withCredentials: true }
        );
        return response.data;
      } else if (user.role === "TUTOR") {
        const response = await api.post(
          "/tutor",
          { data },
          { withCredentials: true }
        );
        return response.data;
      }
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
