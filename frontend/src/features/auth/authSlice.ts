import { createSlice } from "@reduxjs/toolkit";
import { AuthInterface } from "../../types/authTypes";
import { signup } from "./authService";

const user = localStorage.getItem("user");
const initialState: AuthInterface = {
  user: user ? JSON.parse(user) : null,
  isError: false,
  errorMessage: "",
  isLoading: false,
  isSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.errorMessage = "";
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
