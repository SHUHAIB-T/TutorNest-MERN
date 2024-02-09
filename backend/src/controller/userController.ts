import { Request, Response } from "express";
import asynchandler from "express-async-handler";
import { transporter } from "../config/mailConfig";
import Otp from "../model/otpModel";
import { IOtp } from "../model/otpModel";
import User from "../model/userModel";
import bcrypt from "bcryptjs";
import { generateTocken } from "../utils/generateTocken";
import Student from "../model/studentProfile";
import Teacher from "../model/studentProfile";

/**
 * @disc    Sending OTP through mail
 * @route   POST /api/verify-email
 * @access  PUBLIC
 */
export const verifyMail = asynchandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  const isExist = await User.findOne({ email: email });
  if (isExist) {
    res.status(402).json({
      success: false,
      messaage: "Email already Exist",
    });
  }

  // generating random number
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log("OTP============>>>>>>>>>", otp);
  // saving OTP to db
  const salt = await bcrypt.genSalt(10);
  await Otp.findOneAndUpdate(
    { email: email },
    { $set: { email, otp: await bcrypt.hash(otp.toString(), salt) } },
    { upsert: true, new: true }
  );

  const mailOptions = {
    from: "hitutornest@gmail.com",
    to: email,
    subject: "Welcome to TutorNesrt",
    text: `This is your OTP for verification ${otp}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

  res.status(200).json({
    success: true,
    message: "OTP sent",
  });
});

/**
 * @disc    Verifying OTP
 * @route   POST /api/verify-otp
 * @access  PUBLIC
 */
export const verifyOTP = asynchandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const OTP = await Otp.findOne<IOtp>({ email: email });
  if (OTP && (await OTP.matchOTP(otp))) {
    res.status(200).json({
      success: true,
      message: "Email verified Successfully",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid OTP",
    });
  }
});

/**
 * @disc    user signup
 * @route   POST /api/signup
 * @access  PUBLIC
 */
export const userSignup = asynchandler(async (req: Request, res: Response) => {
  const { name, email, password, role, phone } = req.body;
  const isExist = await User.findOne({ email: email });
  if (!isExist) {
    const createUser = await User.create({
      email: email,
      password: password,
      role: role,
    });
    const tocken = generateTocken(createUser._id);
    if (createUser) {
      if (createUser.role === "STUDENT") {
        await Student.create({
          user: createUser._id,
          phone: phone,
          name: name,
        });
      } else if (createUser.role === "TUTOR") {
        await Teacher.create({
          user: createUser._id,
          phone: phone,
          name: name,
        });
      }

      res.status(200).json({
        success: true,
        message: "User creatred successfully",
        user: {
          _id: createUser._id,
          email: createUser.email,
          role: createUser.role,
        },
        tocken: tocken,
      });
    } else {
      res.status(500);
      throw new Error("Something went wrong");
    }
  } else {
    res.status(401);
    throw new Error("Email Already Exist");
  }
});
