// Google Identity Services types (One Tap)
export interface GoogleCredentialResponse {
  credential: string;
  clientId: string;
  select_by?: string;
}

// Google Identity Services types (OAuth)
export interface GoogleOAuthTokenResponse {
  code: string;
  prompt: string;
  scope: string;
}

// Configuration interfaces (for One Tap)
export interface GoogleOneTapConfig {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  context?: "signin" | "signup" | "use";
  ux_mode?: "popup" | "redirect";
  // Additional properties to fix FedCM and compatibility issues
  use_fedcm_for_prompt?: boolean;
  itp_support?: boolean;
  state_cookie_domain?: string;
}

// Configuration interfaces (for OAuth)
export interface GoogleLoginConfig {
  client_id: string;
  callback: (response: GoogleOAuthTokenResponse) => void;
  scope: string;
  prompt: string;
}

// Notification interface for One Tap prompt
export interface GooglePromptNotification {
  isDismissedMoment: () => boolean;
  getDismissedReason: () => string;
  isSkippedMoment?: () => boolean;
  isNotDisplayed?: () => boolean;
  getNotDisplayedReason?: () => string;
}

// Main Google Identity API interface
export interface GoogleIdentityApi {
  accounts: {
    id: {
      initialize: (config: GoogleOneTapConfig) => void;
      prompt: (
        callback?: (notification: GooglePromptNotification) => void
      ) => void;
      cancel: () => void;
    };
    oauth2: {
      initTokenClient: (config: GoogleLoginConfig) => {
        requestAccessToken: () => void;
      };
      initCodeClient: (config: GoogleLoginConfig) => {
        requestCode: () => void;
      };
    };
  };
}
