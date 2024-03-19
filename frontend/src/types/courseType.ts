export interface ICourse {
  _id?: string;
  title: string;
  coverIMG: string;
  description: string;
  price: string;
  createdAt?: string;
  updatedAt?: string;
  teacherId?: string;
  __v?: string;
  category?: string;
  language?: string;
}

export interface ICouresUser {
  _id?: string;
  course: ICourse;
  isEnrolled: boolean;
  averageRating: number;
}

export interface initialState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  courses: ICouresUser[];
  count: number;
  errorMessage: {
    status: number | null;
    message: string;
  };
}

export interface ILesson {
  title: string;
  courseId: string;
  duration: string;
  video: string;
  _id?: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: string;
}

export interface ISearch {
  search: string;
  category: string;
  sort: string;
  language: string;
  page: string;
}
