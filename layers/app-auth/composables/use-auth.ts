import type { RegisterAccountBody } from "../types";

export function useAuth() {
  async function login(body: { username: string; password: string }) {
    try {
      const data = await $fetch("/api/v1/auth/login", {
        method: "POST",
        body,
      });
      return data;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }
  async function register(body: RegisterAccountBody) {
    try {
      const data = await $fetch("/api/v1/auth/register", {
        method: "POST",
        body,
      });
      return data;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  }
  async function refreshToken() {}

  return {
    login,
    register,
    refreshToken,
  };
}
