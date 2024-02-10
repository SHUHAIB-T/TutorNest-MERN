import mongoose, { Schema, ObjectId, model } from "mongoose";

interface IStuednetProfile {
  userID: ObjectId;
  name: string;
  phone: number;
  profile: string;
}

const studentProfile = new Schema<IStuednetProfile>({
  userID: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  phone: Number,
  profile: String,
});

const student = model<IStuednetProfile>("student", studentProfile);
export default student;
