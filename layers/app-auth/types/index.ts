export enum REQUEST_STATUS {
  IDLE = "IDLE",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface RegisterAccountBody {
  username: string;
  password: string;
  email: string;

  fullName?: string;
  phone?: string;
}
