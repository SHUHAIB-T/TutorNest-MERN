import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * @disc    get popular tutors
 * @route   POST /api/message
 * @access  private
 */
export const getPopularTutors: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
  }
);
