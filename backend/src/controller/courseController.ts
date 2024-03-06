import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { ObjectId } from "mongodb";
import Course from "../model/courseModel";

/**
 * @disc    Create course
 * @route   POST /api/course
 * @access  private
 */
export const createCourse: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { coverIMG, description, price, teacherId, title } = req.body;
    console.log(req.body);

    const newCorse = await Course.create({
      title,
      coverIMG,
      description,
      price,
      teacherId: new ObjectId(teacherId),
    });
    if (newCorse) {
      res.status(200).json({
        success: true,
        message: "course created successfully",
        newCorse,
      });
    } else {
      next(Error("Internal server error"));
    }
  }
);
/**
 * @disc    get course
 * @route   GET /api/course
 * @access  private
 */
export const getCourses: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const courses = await Course.find({ isDelete: false });
    if (courses) {
      res.status(200).json({
        success: true,
        courses,
      });
    } else {
      res.status(500);
      next(Error("Internal server Error"));
    }
  }
);

/*
 * @disc    get my course
 * @route   GET /api/tutor/my_course
 * @access  private
 */
export const getMyCourses: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const teacherId = req.user?._id;
    const courses = await Course.find({
      teacherId: teacherId,
      isDelete: false,
    });
    if (courses) {
      res.status(200).json({
        success: true,
        courses,
      });
    } else {
      res.status(500);
      next(Error("Internal server Error"));
    }
  }
);

/**
 * @disc    edit course
 * @route   PUT /api/course/:id
 * @access  private
 */
export const editCourse: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const courseId = req.params.id;
    const { coverIMG, description, price, title } = req.body
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        coverIMG,
        description,
        price,
        title,
      },
      { new: true }
    );
    if (updatedCourse) {
      res.status(200).json({
        success: true,
        message: "Course updated successfully",
        updatedCourse,
      });
    } else {
      res.status(500);
      next(Error("Internal server Error"));
    }
  }
);

/**
 * @disc    delete course
 * @route   PATCH /api/course/:id
 * @access  private
 */
export const deleteCourse: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const courseId = req.params.id;
    const deletedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        isDelete: true,
      },
      { new: true }
    );
    if (deletedCourse) {
      res.status(200).json({
        success: true,
        message: "course deleted successfully",
      });
    } else {
      res.status(500);
      next(Error("Internal server Error"));
    }
  }
);
