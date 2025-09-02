import { REQUEST_STATUS } from "#app-auth/types";
import type { RegisterReq } from "../types/auth.req";

export function useAuth() {
  const { user, fetch: refreshSession, clear: clearSession } = useUserSession();

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

  return {
    user,
    login,
    logout,
    register,
    refreshToken,
    forgotPassword,
  };
}
