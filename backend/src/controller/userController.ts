import { Request, Response } from "express";
import asynchnadler from "express-async-handler";
import { transporter } from "../config/mailConfig";
import Otp from "../model/otpModel";

/**
 * @disc    Sending OTP through mail
 * @route   POST /api/verify-email
 * @access  PUBLIC
 */
export const verifyMail = asynchnadler(async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log("============================>>>>> request got", typeof email);

  // generating random number
  const otp = Math.floor(100000 + Math.random() * 900000);

  // saving OTP to db
  await Otp.create({ email: email, otp: otp });
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

  
  res.json({
    success: true,
  });
});
