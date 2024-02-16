import { Request, Response, NextFunction } from "express";
import asynchandler from "express-async-handler";
import StudentPosts, { IstudentPost } from "../model/studnetPostModet";

/**
 * @desc    Create User Post
 * @route   POST api/student/postes
 * @access  PROTECTED
 */
export const createStudentPost = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.user?._id;
    const { subject, title, description, budjet, language } =
      req.body as IstudentPost;
    const udatedUser = await StudentPosts.create({
      studentId: userID,
      title: title,
      description: description,
      subject: subject,
      budjet: budjet,
      language: language,
    });
    if (udatedUser) {
      res.status(200).json({
        success: true,
        message: "Student Post Created Succefully!",
        udatedUser: {
          title: udatedUser.title,
          description: udatedUser.description,
          subject: udatedUser.subject,
          budjet: udatedUser.budjet,
          language: udatedUser.language,
        },
      });
    } else {
      next(Error("Something went wrong!"));
    }
  }
);

/**
 * @desc    Update User Post
 * @route   PUT api/student/postes/:id
 * @access  PROTECTED
 */
export const updateStudentpost = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.user?._id;
    const postId = req.params.id;
    const { subject, title, description, budjet, language } =
      req.body as IstudentPost;
    const udatedUser = await StudentPosts.findOneAndUpdate(
      { studentId: userID, _id: postId },
      {
        subject: subject,
        title: title,
        description: description,
        budjet: budjet,
        language: language,
      },
      { new: true }
    );
    if (udatedUser) {
      res.status(200).json({
        success: true,
        message: "Post updated Succefully!",
        udatedUser: {
          title: udatedUser.title,
          description: udatedUser.description,
          subject: udatedUser.subject,
          budjet: udatedUser.budjet,
          language: udatedUser.language,
        },
      });
    } else {
      res.status(500);
      next(Error("Something went wrong!"));
    }
  }
);

/**
 * @desc    Delete User Post
 * @route   PATCH api/student/postes/:id
 * @access  PROTECTED
 */
export const deleteStudentPost = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const deletedPost = await StudentPosts.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        isDelete: true,
      },
      { new: true }
    );
    if (deletedPost) {
      res.status(200).json({
        success: true,
        message: "Post Deleted Succefully!",
      });
    } else {
      next(Error("Something went wrong!"));
    }
  }
);

/**
 * @desc    Gert all  Post
 * @route   PATCH api/student/postes/:id
 * @access  PROTECTED
 */
export const getAUserPosts = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.user?._id;
    const posts = await StudentPosts.find({ studentId: userID });

    if (posts) {
      res.status(200).json({
        success: true,
        posts: posts,
      });
    } else {
      next(Error("Something went wrong!"));
    }
  }
);
