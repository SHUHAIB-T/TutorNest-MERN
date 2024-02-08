import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

interface IOtp {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema = new Schema<IOtp>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60,
  },
});

otpSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.otp = await bcrypt.hash(this.otp, salt);
});

otpSchema.methods.matchOTP = async function (OTP: number) {
  const OTPString = OTP.toString();
  return await bcrypt.compare(OTPString, this.otp);
};

const Otp = model<IOtp>("Otp", otpSchema);
export default Otp;
