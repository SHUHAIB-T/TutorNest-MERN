import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import Requests from "../model/requestModal";

/**
 * @disc    Create Request
 * @route   POST /api/tutor/createConnection
 * @access  private
 */
export const createConnection = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const teacherId = req.user?._id;
    const { studentId } = req.body;
    const aleadySent = await Requests.findOne({
      teacherId: teacherId,
      studentId: studentId,
    });
    if (!aleadySent) {
      const creatConnection = await Requests.create({
        studentId,
        teacherId,
      });
      if (creatConnection) {
        res.status(200).json({
          success: true,
          message: "Connection request sent",
        });
      } else {
        next(Error("Somethig went wrong"));
      }
    } else {
      res.status(402);
      next(Error("Request Allready sent!"));
    }
  }
);

/**
 * @disc    Cancel Request
 * @route   POST /api/tutor/cancelConnection
 * @access  private
 */
export const CancelConnection = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const teacherId = req.user?._id;
    const { studentId } = req.body;
    const deleteRequest = await Requests.findOneAndDelete({
      studentId: studentId,
      teacherId: teacherId,
    });
    
    if (deleteRequest) {
      res.status(200).json({
        success: true,
        message: "Connection request sent",
      });
    } else {
      next(Error("Somethig went wrong"));
    }
  }
);
