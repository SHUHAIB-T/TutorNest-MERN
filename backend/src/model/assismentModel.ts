import mongoose, { ObjectId, Schema, model } from "mongoose";

type Tquestion = {
  question: string;
  options: string[];
  answer: string;
  mark: number;
};

export interface IAssessment {
  courseId: ObjectId;
  questions: Tquestion[];
  minimuMark: number;
}

const assessmentSchema = new Schema<IAssessment>({
  courseId: { type: mongoose.Types.ObjectId, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: { type: Array, required: true },
      answer: { type: String, required: true },
      mark: { type: Number, required: true },
    },
  ],
  minimuMark: { type: Number, required: true },
});

const Assessment = model("Assessment", assessmentSchema);
export default Assessment;
