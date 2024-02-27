import { createSlice } from "@reduxjs/toolkit";
import { IChatInitial, errorMessage } from "../../types/chatandMessage";
import { getAllChats } from "./chatServieces";

const initialState: IChatInitial = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: {
    message: "",
    status: null,
  },
  chat: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.errorMessage = {
        message: "",
        status: null,
      };
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chat = action.payload.chats;
      })
      .addCase(getAllChats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload as errorMessage;
      });
  },
});

export const { reset } = chatSlice.actions;
const chatReducer = chatSlice.reducer;
export default chatReducer;
