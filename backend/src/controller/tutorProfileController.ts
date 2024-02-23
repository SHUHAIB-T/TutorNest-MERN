import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import Teacher from "../model/teacherProfile";
import mongoose from "mongoose";
import StudentPosts from "../model/studnetPostModet";
import Requests from "../model/requestModal";
import Student from "../model/studentProfile";

/**
 * @disc    get tutor profile
 * @route   GET /api/tutor
 * @access  private
 */
export const getProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const userProfile = await Teacher.findOne({ userID: userId });
    if (userProfile) {
      res.status(200).json({
        success: true,
        userProfile: userProfile,
      });
    } else {
      return next(Error("Somthing went wrong"));
    }
  }
);

/**
 * @disc    get tutor profile
 * @route   GET /api/tutor
 * @access  private
 */
export const updateProfilePicture = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.user?._id;
    const { url } = req.body;
    const updatedUser = await Teacher.findOneAndUpdate(
      { userID: new mongoose.Types.ObjectId(userID) },
      {
        profile: url,
      },
      {
        new: true,
      }
    );
    if (updatedUser) {
      res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        userProfile: updatedUser,
      });
    } else {
      res.status(400);
      return next(Error("Some Error Occured"));
    }
  }
);

/**
 * @disc    Update studnet profile
 * @route   POST /api/student/updateProfile
 * @access  private
 */
export const updateTutorProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const { name, phone, bio, qualification, languages, pricing } =
      req.body.data;
    const updatedUser = await Teacher.findOneAndUpdate(
      { userID: userId },
      {
        name: name,
        phone: parseInt(phone, 10),
        bio: bio,
        qualification: qualification,
        languages: languages,
        pricing: parseInt(pricing, 10),
      },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        userProfile: updatedUser,
      });
    } else {
      res.status(400);
      return next(Error("Some Error Occured"));
    }
  }
);

/**
 * @disc    Get Studnets Posts
 * @route   GET /api/tutor/posts
 * @access  private
 */
export const getStudentsPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await StudentPosts.aggregate([
      { $match: { isDelete: false } },
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "userID",
          as: "profile",
        },
      },
      { $unwind: "$profile" },
      {
        $project: {
          isDelete: 0,
          __v: 0,
          "profile._id": 0,
          "profile.userID": 0,
          "profile.phone": 0,
          "profile.dob": 0,
          "profile.gender": 0,
          "profile.standard": 0,
          "profile.subjects": 0,
          "profile.intrests": 0,
          "profile.__v": 0,
          "profile.preffered_language": 0,
        },
      },
    ]);

    const teacherId = req.user?._id;

    for (const post of posts) {
      const connection = await Requests.findOne({
        studentId: post.studentId,
        teacherId,
      });
      if (connection) {
        post.reqStatus = connection.status;
      } else {
        post.reqStatus = "NONE";
      }
    }

    if (posts) {
      res.status(200).json({
        success: true,
        posts: posts,
      });
    } else {
      next(Error("No Student Posts"));
    }
  }
);

/**
 * @disc    Get My students
 * @route   GET /api/tutor/myStudents
 * @access  private
 */
export const getMyStudents = asyncHandler(
  async (req: Request, res: Response) => {
    const teacherId = req.user?._id;
    const posts = [];
    const teacher = await Teacher.findOne(
      { userID: teacherId },
      { connections: 1 }
    );
    const connections = teacher?.connections ? teacher?.connections : [];
    for (const student of connections) {
      const Mystydent = await Student.findOne(
        { userID: student },
        { connections: 0, __v: 0, profile: 0, dob: 0 }
      );
      if (student) {
        posts.push(Mystydent);
      }
    }
    res.status(200).json({
      success: true,
      students: posts,
    });
  }
);
