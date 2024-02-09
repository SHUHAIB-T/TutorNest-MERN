type userType = {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: string;
};

export interface AuthInterface {
  user: userType | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  isSuccess: boolean;
}

export type userData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};
