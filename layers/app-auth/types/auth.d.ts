import type { UserRes } from "./auth.res";

declare module "#auth-utils" {
  interface User extends UserRes {
    accessToken?: string;
    expiresAtAccess?: number;
  }

  interface SecureSessionData {
    refreshToken?: string;
    expiresAtRefresh?: number;
  }
}

export {};
