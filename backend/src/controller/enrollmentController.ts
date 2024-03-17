import asyncHandler from "express-async-handler";
import { Request, Response, RequestHandler, NextFunction } from "express";
import Enrollment from "../model/enrollmentModel";
import {
  IRazorder,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../utils/razorpayOrder";
import Student from "../model/studentProfile";
import Payment from "../model/paymentModel";
import Course from "../model/courseModel";

/**
 * @desc     create Enrollment
 * @route    POST  api/enrollment/create
 * @access   private
 */
export const createEnrollment: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.body;
    const studentId = req.user?._id;
    const course = await Course.findOne(
      { _id: courseId },
      { _id: 0, price: 1 }
    );
    const amount = course?.price;

    const enrollment = await Enrollment.findOneAndUpdate(
      {
        courseId: courseId,
        studentId: studentId,
      },
      {
        courseId: courseId,
        studentId: studentId,
        payment_status: "pending",
      },
      {
        new: true,
        upsert: true,
      }
    );

    const user = await Student.findOne(
      { userID: studentId },
      { name: 1, phone: 1 }
    );

    const Razorder = await createRazorpayOrder(
      enrollment._id as unknown as string,
      amount as number
    )
      .then((order) => order)
      .catch((err) => {
        console.log("Error with razorpay ====>>>", err);
        if (err) {
          res.status(500);
          next(Error("Error occured in razorpay"));
        }
      });

    const timestamp = (Razorder as IRazorder).created_at;
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toISOString();

    await Payment.findOneAndUpdate(
      {
        enrollmentId: enrollment._id,
      },
      {
        paymentId: (Razorder as IRazorder).id,
        amount: (Razorder as IRazorder).amount / 100,
        currency: (Razorder as IRazorder).currency,
        enrollmentId: enrollment._id,
        status: (Razorder as IRazorder).status,
        created_at: formattedDate,
      },
      {
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
      order: Razorder,
      user,
    });
  }
);

/**
 * @desc     verify payment
 * @route    POST  api/enrollment/verify
 * @access   private
 */
export const verifyPayment: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const isVerified = verifyRazorpayPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );
    if (isVerified) {
      const payment = await Payment.findOne(
        { paymentId: razorpay_order_id },
        { _id: 0, enrollmentId: 1 }
      );

      if (payment) {
        const enrollmentId = payment.enrollmentId;

        await Enrollment.findOneAndUpdate(
          { _id: enrollmentId },
          { $set: { payment_status: "completed" } }
        );

        res.json({
          success: true,
          message: "payment verified successfull",
        });
      }
    } else {
      res.status(500);
      next(Error("Internal Server Error"));
    }
  }
);
