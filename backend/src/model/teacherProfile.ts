import mongoose, { Schema, model, ObjectId } from "mongoose";

interface ITeacherProfile {
  userID: ObjectId;
  name: string;
  phone: number;
  profile: string;
}

const teacherProfile = new Schema<ITeacherProfile>({
  userID: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  profile: String,
});

const teacher = model<ITeacherProfile>("teacher", teacherProfile);
export default teacher;
