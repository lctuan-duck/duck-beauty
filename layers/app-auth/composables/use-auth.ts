import { REQUEST_STATUS } from "#app-auth/types";
import type { RegisterReq } from "../types/auth.req";
import { FetchError } from "ofetch";

export function useAuth() {
  const { user, fetch: refreshSession, clear: clearSession } = useUserSession();

  async function loginWithFacebook(body: { token: string }) {
    try {
      await $fetch("/api/v1/auth/facebook", {
        method: "POST",
        body,
      });
      await refreshSession();
      return {
        status: REQUEST_STATUS.SUCCESS,
        code: 200,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        status: REQUEST_STATUS.ERROR,
        code: (error as { statusCode: number }).statusCode || 0,
      };
    }
  }

  async function login(body: { credential: string; password: string }) {
    try {
      await $fetch("/api/v1/auth/login", {
        method: "POST",
        body,
      });
      await refreshSession();
      return {
        status: REQUEST_STATUS.SUCCESS,
        code: 200,
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        status: REQUEST_STATUS.ERROR,
        code: (error as { statusCode: number }).statusCode || 0,
      };
    }
  }

  async function register(body: RegisterReq) {
    try {
      await $fetch("/api/v1/auth/register", {
        method: "POST",
        body,
      });
      await refreshSession();
      return {
        status: REQUEST_STATUS.SUCCESS,
        code: 201,
      };
    } catch (error) {
      console.error("Register error:", error);

      if (error instanceof FetchError) {
        const payload = error.data as {
          statusCode: number;
          data?: { type: string; message: string };
        };

        return {
          status: REQUEST_STATUS.ERROR,
          code: payload.statusCode || 0,
          type: payload?.data?.type as
            | "USERNAME_EXISTS"
            | "EMAIL_EXISTS"
            | undefined,
        };
      }
      return {
        status: REQUEST_STATUS.ERROR,
        code: (error as { statusCode: number }).statusCode || 0,
      };
    }
  }

  async function refreshToken() {}

  async function logout(redirect: boolean = true) {
    try {
      await $fetch("/api/v1/auth/logout");

      clearSession();

      if (redirect) navigateTo("/auth/signin", { external: true });
      return {
        status: REQUEST_STATUS.SUCCESS,
        code: 200,
      };
    } catch (error) {
      console.error("Logout error:", error);

      clearSession();

      return {
        status: REQUEST_STATUS.ERROR,
        code: (error as { statusCode: number }).statusCode || 0,
      };
    }
  }

  async function forgotPassword(email: string) {
    try {
      await $fetch("/api/proxy/v1/auth/forgot-password", {
        method: "POST",
        body: { email },
      });

      return {
        status: REQUEST_STATUS.SUCCESS,
        code: 200,
      };
    } catch (error) {
      console.error("Forgot password error:", error);
      return {
        status: REQUEST_STATUS.ERROR,
        code: (error as { statusCode: number }).statusCode || 0,
      };
    }
  }

  async function resetPassword(body: { session: string; password: string }) {
    try {
      await $fetch("/api/proxy/v1/auth/reset-password", {
        method: "PATCH",
        body,
      });

      return {
        status: REQUEST_STATUS.SUCCESS,
        code: 200,
      };
    } catch (error) {
      console.error("Reset password error:", error);
      return {
        status: REQUEST_STATUS.ERROR,
        code: (error as { statusCode: number }).statusCode || 0,
      };
    }
  }

  return {
    user,
    login,
    loginWithFacebook,
    logout,
    register,
    refreshToken,
    forgotPassword,
    resetPassword,
  };
}
