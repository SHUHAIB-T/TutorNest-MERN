import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export interface IUser {
  _id: ObjectId;
  email: string;
  role: string;
  password: string;
  status: boolean;
  matchPassword(Password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    role: { type: String, required: true, enum: ["ADMIN", "TUTOR", "STUDENT"] },
    password: { type: String },
    status: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = model<IUser>("User", userSchema);
export default User;
