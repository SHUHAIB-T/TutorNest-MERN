import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import Requests from "../model/requestModal";
import Teacher from "../model/teacherProfile";
import Student from "../model/studentProfile";

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

/**
 * @disc    get My requests
 * @route   GET /api/student/request
 * @access  private
 */
export const getAllmyRequests = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.user?._id;
    const requests = await Requests.aggregate([
      { $match: { studentId: studentId, status: "PENDING" } },
      {
        $lookup: {
          from: "teachers",
          localField: "teacherId",
          foreignField: "userID",
          as: "teacher",
        },
      },
      { $unwind: "$teacher" },
      {
        $project: {
          "teacher.name": 1,
          "teacher.profile": 1,
          "teacher.bio": 1,
          _id: 1,
          status: 1,
          teacherId: 1,
          studentId: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    if (requests) {
      res.status(200).json({
        success: true,
        requests,
      });
    } else {
      next(Error("No requests found"));
    }
  }
);

/**
 * @disc    Accept Request
 * @route   POST /api/student/acceptRequest/:id
 * @access  private
 */
export const acceptRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const studentId = req.user?._id;
    const { teacherId } = req.body;
    const updateRequest = await Requests.findByIdAndUpdate(
      { _id: id },
      { status: "CONNECTED" },
      { new: true }
    );
    const updateTutor = await Teacher.findOneAndUpdate(
      { userID: teacherId },
      { $push: { connections: studentId } }
    );
    const updateStudent = await Student.findOneAndUpdate(
      { userID: studentId },
      { $push: { connections: teacherId } }
    );
    if (updateRequest && updateStudent && updateTutor) {
      res.status(200).json({
        success: true,
        message: "Request accepted",
      });
    } else {
      next(Error("Some Error Occured"));
    }
  }
);

/**
 * @disc    Delete requests
 * @route   POST /api/student/deleteRequest/:id
 * @access  private
 */
export const deleteRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const deleteRequest = await Requests.findOneAndDelete({ _id: id });
    if (deleteRequest) {
      res.status(200).json({
        success: true,
        message: "Request Rejected",
      });
    } else {
      next(Error("Error Deleting the request"));
    }
  }
);
