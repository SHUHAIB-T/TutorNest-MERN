import { Schema, model } from "mongoose";

interface ITeacherProfile {
  name: string;
  phone: number;
}

const teacherProfile = new Schema<ITeacherProfile>({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
});

const teacher = model<ITeacherProfile>("teacher", teacherProfile);
export default teacher;
