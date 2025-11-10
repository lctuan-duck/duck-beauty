export interface RegisterReq {
  email: string;
  username: string;
  password: string;
  fullName?: string;
  phone?: string;
  avatar?: string;
}

export interface LoginReq {
  credential: string; // email or username
  password: string;
}
