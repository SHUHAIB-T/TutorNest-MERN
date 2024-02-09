import mongoose, { Schema, ObjectId, model } from "mongoose";

interface IStuednetProfile {
  user: ObjectId;
  name: string;
  phone: number;
}

const studentProfile = new Schema<IStuednetProfile>({
  user: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  phone: { type: Number, required: true },
});

const teacher = model<IStuednetProfile>("student", studentProfile);
export default teacher;
