import { createSlice } from "@reduxjs/toolkit";

export type initialSocketState = {
  onlineUsers: {
    userId: string;
    socketId: string;
  }[];
};

const initialState: initialSocketState = {
  onlineUsers: [],
};

const SocketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setOnlineUsers } = SocketSlice.actions;
const socketReducer = SocketSlice.reducer;
export default socketReducer;
