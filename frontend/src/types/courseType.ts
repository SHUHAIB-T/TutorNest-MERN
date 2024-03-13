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
