export interface RegisterAccountBody {
  username: string;
  password: string;
  email: string;

  fullName?: string;
  phone?: string;
}
