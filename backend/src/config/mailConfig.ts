import nodemailer from "nodemailer";

// creating a nodemailer transporter
export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "shuhaibtu79@gmail.com",
    pass: "ylceotctekaxltku", // password generated
  },
});
