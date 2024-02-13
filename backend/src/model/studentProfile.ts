import mongoose, { Schema, ObjectId, model } from "mongoose";

export interface IStuednetProfile {
  userID: ObjectId;
  name: string;
  phone: number | null;
  profile: string;
  dob: Date | string;
  gender: string;
  standard: string | null;
  subjects: string[];
  intrests: string[];
  preffered_language: string;
}

const studentProfile = new Schema<IStuednetProfile>({
  userID: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  phone: { type: Number, default: null },
  profile: { type: String, default: "" },
  dob: { type: Date, default: "" },
  gender: { type: String, default: "" },
  standard: { type: String, default: null },
  subjects: Array,
  intrests: Array,
  preffered_language: String,
});

const student = model<IStuednetProfile>("student", studentProfile);
export default student;
