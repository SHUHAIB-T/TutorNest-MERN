import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction, RequestHandler } from "express";
import Assessment from "../model/assismentModel";

/**
 * @disc    create Assessment
 * @route   POST /api/assessment
 * @access  private
 */
export const createAssessment: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId, minimuMark, questions } = req.body;
    const creatAssessment = await Assessment.findOneAndUpdate(
      {
        courseId: courseId,
      },
      {
        minimuMark: parseInt(minimuMark, 10),
        questions: questions,
      },
      {
        new: true,
        upsert: true,
      }
    );

    if (creatAssessment) {
      res.status(200).json({
        success: true,
        message: "assessment created Successfully",
        assessment: creatAssessment,
      });
    } else {
      res.status(500);
      next(Error("Internal Server Error!"));
    }
  }
);

/**
 * @disc    get Assessment
 * @route   GET /api/assessment/id
 * @access  private
 */
export const getAssessment: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    const assessment = await Assessment.findOne({ courseId: courseId });
    if (assessment) {
      res.status(200).json({
        success: true,
        assessment,
      });
    } else {
      res.status(500);
      next(Error("Internal Server Error"));
    }
  }
);
