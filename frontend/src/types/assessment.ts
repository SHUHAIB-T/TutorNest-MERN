export interface IQuesion {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
  mark: string;
  _id?: string;
  id?: string;
}

export interface IAssessment {
  _id?: string;
  courseId?: string;
  minimumMark: number | null;
  questions: IQuesion[];
}
