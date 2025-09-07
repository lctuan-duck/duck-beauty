import type { UserAuthRes } from "~~/layers/app-auth/types";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, data: { tokens: { id_token: string } }) {
    try {
      const result = await $fetch<UserAuthRes>(
        `${process.env.APP_API_URL}/api/v1/auth/google`,
        {
          method: "POST",
          body: {
            credential: data.tokens.id_token,
          },
        }
      );

      await setUserSession(event, {
        user: {
          ...result.user,
          accessToken: result.token.accessToken,
          expiresAtAccess: result.token.expiresAtAccess,
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
