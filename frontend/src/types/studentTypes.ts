export interface IRequests {
  _id: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  teacherId: string;
  studentId?: string;
  teacher: {
    name: string;
    profile: string;
    bio: string;
  };
}
