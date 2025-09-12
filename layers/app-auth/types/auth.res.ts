export type TokenRes = {
  accessToken: string;
  refreshToken: string;
  expiresAtAccess: number;
  expiresAtRefresh: number;
  sessionId: string;
};

export type UserRes = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phone: string;
  avatar: string;
  role: number;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserAuthRes = {
  user: UserRes;
  token: TokenRes;
};
