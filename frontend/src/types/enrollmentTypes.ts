import { ICourse, ILesson } from "./courseType";

export interface IEnrollments {
  _id?: string;
  courseId?: string;
  completed?: string[];
  isComplete: boolean;
  course: myCourse;
}

export interface myCourse extends ICourse {
  lessons?: ILesson[];
}

export interface IinitialState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  enrollments: IEnrollments[];
  errorMessage: {
    message: string;
    status: number | null;
  };
}
