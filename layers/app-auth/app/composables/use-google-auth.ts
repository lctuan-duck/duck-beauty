import {
  REQUEST_STATUS,
  type GoogleCredentialResponse,
  type GoogleIdentityApi,
  type GoogleLoginConfig,
  type GoogleOAuthTokenResponse,
  type GoogleOneTapConfig,
  type GooglePromptNotification,
  type UserAuthRes,
} from "../types";

export function useGoogleAuth() {
  const route = useRoute();

  // ---------- STATE ----------
  const state = ref({
    isGoogleAuthInProgress: false,
    isScriptLoaded: false,
  });

  // ---------- HELPERS ----------
  function resetAuthStates() {
    state.value.isGoogleAuthInProgress = false;
  }

  function saveSearchQueryForAfterAuth() {
    const { query } = route;
    if (!query.query) return;

    const queryValue = Array.isArray(query.query)
      ? query.query[0]
      : query.query;

    if (typeof window !== "undefined") {
      sessionStorage.setItem("pendingSearchQuery", queryValue || "");
    }
  }

  function loadGoogleScript(): Promise<void> {
    if (typeof window === "undefined" || state.value.isScriptLoaded) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      if (
        document.querySelector(
          'script[src="https://accounts.google.com/gsi/client"]'
        )
      ) {
        state.value.isScriptLoaded = true;
        return resolve();
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;

      script.onload = function () {
        state.value.isScriptLoaded = true;
        resolve();
      };

      script.onerror = function () {
        console.error("❌ Failed to load Google Identity script");
        reject(new Error("Không thể load Google Identity Services"));
      };

      document.head.appendChild(script);
    });
  }

  // ---------- LOGIN WITH GOOGLE ----------
  async function loginWithGoogle() {
    try {
      if (state.value.isGoogleAuthInProgress) return;

      state.value.isGoogleAuthInProgress = true;
      saveSearchQueryForAfterAuth();

      // Save redirect URL from login page to cookie for Google OAuth callback
      if (route.query.redirect && typeof route.query.redirect === "string") {
        // Save to cookie that will be read by server-side OAuth handler
        document.cookie = `auth-redirect=${encodeURIComponent(
          route.query.redirect
        )}; path=/; max-age=600`;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      window.location.href = "/api/v1/auth/google";
    } catch (error) {
      console.error("❌ Google Login Error:", error);
      resetAuthStates();
    }
  }

  // ---------- VERIFY GOOGLE CREDENTIAL ----------
  async function verifyGoogleCredential(body: { credential: string }) {
    if (state.value.isGoogleAuthInProgress) return;

    try {
      state.value.isGoogleAuthInProgress = true;

      saveSearchQueryForAfterAuth();

      const result = await $fetch<UserAuthRes>("/api/v1/auth/google", {
        method: "POST",
        body,
      });

      if (!result) {
        throw new Error("Đăng nhập thất bại");
      }

      const { fetch: refreshSession } = useUserSession();
      await refreshSession();

      return result;
    } catch (error) {
      console.error("❌ Google One Tap Error:", error);
      state.value.isGoogleAuthInProgress = false;
      throw error;
    }
  }

  // ---------- ONE TAP FLOW ----------
  async function initOneTap(useFedCM: boolean = true) {
    await loadGoogleScript();

    const googleApi = window.google as unknown as GoogleIdentityApi;
    if (!googleApi?.accounts?.id) {
      throw new Error("Google Identity Services not available");
    }

    const config = useRuntimeConfig();
    const clientId = config.public.clientID as string;
    if (!clientId) throw new Error("Google Client ID not configured");

    const googleConfig: GoogleOneTapConfig = {
      client_id: clientId,
      callback: verifyGoogleCredential,
      auto_select: false,
      cancel_on_tap_outside: false,
      context: "signin",
      ux_mode: "popup",
      use_fedcm_for_prompt: useFedCM,
      itp_support: true,
      state_cookie_domain: window.location.hostname,
    };

    try {
      googleApi.accounts.id.initialize(googleConfig);
      googleApi.accounts.id.prompt(function (
        notification: GooglePromptNotification
      ) {
        console.log("🔔 One Tap notification:", notification);

        if (notification.isDismissedMoment()) {
          console.log(
            "⚠️ One Tap dismissed:",
            notification.getDismissedReason()
          );
        } else if (notification.isNotDisplayed?.()) {
          console.log(
            "❌ One Tap not displayed:",
            notification.getNotDisplayedReason?.()
          );
        } else if (notification.isSkippedMoment?.()) {
          console.log("⏭️ One Tap skipped by user");
        } else {
          console.log("✅ One Tap displayed successfully");
        }
      });

      console.log("✅ One Tap initialized");
    } catch (error) {
      console.error("❌ Failed to initialize One Tap:", error);
      throw error;
    }
  }

  function cancelOneTap() {
    try {
      const googleApi = window.google as unknown as GoogleIdentityApi;
      googleApi?.accounts?.id?.cancel();
      console.log("🚫 One Tap cancelled");
    } catch (error) {
      console.debug("Cancel error (safe to ignore):", error);
    }
  }

  // ---------- RETURN ----------
  return {
    state,

    loadGoogleScript,
    loginWithGoogle,

    initOneTap,
    cancelOneTap,

    resetAuthStates,
  };
}
