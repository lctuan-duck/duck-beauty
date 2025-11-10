import type { UserAuthRes } from "#app-auth/app/types";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, data: { tokens: { id_token: string } }) {
    try {
      // get device id from cookie
      const deviceId = getCookie(event, "device-id") || "";

      const result = await $fetch<UserAuthRes>(
        `${process.env.APP_API_URL}/api/v1/auth/google`,
        {
          method: "POST",
          body: {
            credential: data.tokens.id_token,
            deviceId,
          },
        }
      );

      await setUserSession(event, {
        user: {
          ...result.user,
          accessToken: result.token.accessToken,
          expiresAtAccess: result.token.expiresAtAccess,
          sessionId: result.token.sessionId,
        },
        secure: {
          refreshToken: result.token.refreshToken,
          expiresAtRefresh: result.token.expiresAtRefresh,
        },
      });

      // Check for redirect parameter from session or query
      const redirectUrl = getCookie(event, "auth-redirect") || "/";

      // Clean up redirect cookie
      if (getCookie(event, "auth-redirect")) {
        deleteCookie(event, "auth-redirect");
      }

      await sendRedirect(event, redirectUrl);
    } catch (error) {
      console.error("Google OAuth error:", error);
      return sendRedirect(event, "/auth/signin?error=auth_failed");
    }
  },

  async onError(event, error) {
    console.error("Google OAuth error:", error);
    return sendRedirect(event, "/auth/signin?error=oauth_error");
  },
});
