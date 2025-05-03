import { REQUEST_STATUS, type RegisterAccountBody } from "#app-auth/types";

export function useAuth() {
  const { user, fetch: refreshSession, clear: clearSession } = useUserSession();

  async function login(body: { identifier: string; password: string }) {
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
  async function register(body: RegisterAccountBody) {
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
  async function logout() {
    try {
      await $fetch("/api/v1/auth/logout");
      await clearSession();
      return {
        status: REQUEST_STATUS.SUCCESS,
        code: 200,
      };
    } catch (error) {
      console.error("Logout error:", error);
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
  };
}
