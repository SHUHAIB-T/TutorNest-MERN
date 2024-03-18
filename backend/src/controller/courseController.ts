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
    const {
      coverIMG,
      description,
      price,
      teacherId,
      title,
      language,
      category,
    } = req.body;
    const newCorse = await Course.create({
      title,
      coverIMG,
      description,
      price,
      language,
      category,
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
    const page: number = parseInt(req.query.page as string, 10) || 1;
    const pageSize = 12;
    const userId = req.user?._id;
    let courses = await Course.aggregate([
      {
        $match: {
          isDelete: false,
        },
      },
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "courseId",
          as: "ratings",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $gte: ["$rating", 1] }, { $lte: ["$rating", 5] }],
                },
              },
            },
          ],
        },
      },
      {
        $unwind: { path: "$ratings", preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: "$_id",
          averageRating: { $avg: "$ratings.rating" },
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: {
          path: "$course",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "enrollments",
          localField: "_id",
          foreignField: "courseId",
          as: "enrollment",
          pipeline: [{ $match: { studentId: userId } }],
        },
      },
      {
        $project: {
          "course.title": 1,
          "course.description": 1,
          "course.price": 1,
          "course.coverIMG": 1,
          "course.category": 1,
          "course.language": 1,
          "course.createdAt": 1,
          isEnrolled: { $eq: [{ $size: "$enrollment" }, 1] },
          averageRating: { $ifNull: ["$averageRating", 0] },
        },
      },
      {
        $skip: (page - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
    ]);

    if (req.query.search) {
      const query = (req.query.search as string)
        .toLowerCase()
        .replace(/\s/g, "");
      courses = courses.filter((e) => {
        const title = e.course.title.toLowerCase().replace(/\s/g, "");
        if (title.includes(query)) {
          return true;
        } else if (query.includes(title)) {
          return true;
        }
        const language = e.course.language.toLowerCase().replace(/\s/g, "");
        if (language.includes(query)) {
          return true;
        } else if (query.includes(language)) {
          return true;
        }
        const category = e.course.category.toLowerCase().replace(/\s/g, "");

        if (category.includes(query)) {
          return true;
        } else if (query.includes(category)) {
          return true;
        }
      });
    }

    if (req.query.category) {
      courses = courses.filter((e) => e.course.category === req.query.category);
    }
    if (req.query.language) {
      courses = courses.filter((e) => e.course.language === req.query.language);
    }

    const sortQuery = req.query.sort;
    switch (sortQuery) {
      case "low-high":
        courses.sort((a, b) => {
          const priceA = parseFloat(a.course.price);
          const priceB = parseFloat(b.course.price);
          return priceA - priceB;
        });
        break;
      case "high-low":
        courses.sort((a, b) => {
          const priceA = parseFloat(a.course.price);
          const priceB = parseFloat(b.course.price);
          return priceB - priceA;
        });
        break;
      case "new-first":
        courses.sort((a, b) => {
          const createdAtA = new Date(a.course.createdAt);
          const createdAtB = new Date(b.course.createdAt);
          return createdAtB.getTime() - createdAtA.getTime();
        });
        break;
      case "popular":
        courses.sort((a, b) => {
          const ratingA = parseFloat(a.averageRating);
          const ratingB = parseFloat(b.averageRating);
          return ratingB - ratingA;
        });
        break;
      default:
        break;
    }
    let count = await Course.countDocuments();
    count = ~~(count / 12);
    if (courses) {
      res.status(200).json({
        success: true,
        courses,
        count,
      });
    } else {
      res.status(500);
      next(Error("Internal Server Error"));
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
    const { coverIMG, description, price, title, category, language } =
      req.body;
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        coverIMG,
        description,
        price,
        title,
        category,
        language,
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
