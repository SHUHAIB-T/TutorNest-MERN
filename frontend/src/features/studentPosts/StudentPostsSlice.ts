import { createSlice } from "@reduxjs/toolkit";
import { IStudentPost } from "../../types/PostsTypes";
import { getStudentPosts, createStudentPosts } from "./StudentPostsService";
import { errorMessage } from "../../types/authTypes";
import { toast } from "react-toastify";

const initialState: IStudentPost = {
  isLoading: false,
  erroMessage: {
    message: "",
    status: null,
  },
  isSuccess: false,
  isError: false,
  posts: [],
};

const studentPostSlice = createSlice({
  name: "studentPost",
  initialState,
  reducers: {
    reset: (state) => {
      state.erroMessage = {
        message: "",
        status: null,
      };
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload.posts;
      })
      .addCase(getStudentPosts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.erroMessage = action.payload as errorMessage;
      })
      .addCase(createStudentPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudentPosts.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload.udatedUser);
        toast.success("Post created successfully!")
      })
      .addCase(createStudentPosts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.erroMessage = action.payload as errorMessage;
      });
  },
});

export const { reset } = studentPostSlice.actions;
export default studentPostSlice.reducer;
