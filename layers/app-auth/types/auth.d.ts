declare module "#auth-utils" {
  interface User {
    id: string;
    fullName: string;
    username: string;
    phone?: string;
    email: string;
    avatar?: string;
    accessToken?: string;
    expiresAt?: number;
  }

  interface SecureSessionData {
    refreshToken?: string;
    expiresAt?: number;
  }
}

export {};
