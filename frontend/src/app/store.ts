import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import authSlice from "../features/auth/authSlice";
import userSlice from "../features/users/userSlice";
import studentPosts from "../features/studentPosts/StudentPostsSlice";
import chatSlice from "../features/chat/chatSlice";
import socketSlice from "../features/Socket/SocketSlice";
import courseSlice from "../features/course/courseSlice";
import courseDetailSlice from "../features/course/courseDetails/CourseDetails";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    userProfile: userSlice,
    studentPosts: studentPosts,
    chat: chatSlice,
    socket: socketSlice,
    course: courseSlice,
    courseDetail: courseDetailSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
