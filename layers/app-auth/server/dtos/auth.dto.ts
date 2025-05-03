export enum USER_ROLE {
  USER = 1,
  ADMIN = 0,
}

export interface RegisterAccountDTO {
  email: string;
  username: string;
  phone?: string;
  password: string;
  fullName?: string;
  role: USER_ROLE;
}

export interface LoginAccountDTO {
  username: string; // username or email
  password: string;
}
