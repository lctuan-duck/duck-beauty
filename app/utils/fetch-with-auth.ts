import type { NitroFetchOptions } from "nitropack";
import { FetchError } from "ofetch";

function generateAuthHeaders(headers: HeadersInit = {}) {
  const { user } = useUserSession();
  return {
    ...headers,
    ...(user.value?.accessToken
      ? { Authorization: `Bearer ${user.value.accessToken}` }
      : {}),
  };
}

export async function fetchWithAuth<Response>(
  apiPath: string,
  options: NitroFetchOptions<string> = {},
  maxRetries: number = 3
) {
  try {
    return await $fetch<Response>(apiPath, {
      ...options,
      headers: generateAuthHeaders(options.headers),
    });
  } catch (error) {
    if (
      error instanceof FetchError &&
      error.response?.status === 401 &&
      maxRetries > 0
    ) {
      // Handle 401 Unauthorized error by refreshing the token and retrying the request
      try {
        const { refreshToken } = useAuth();
        await refreshToken(); // refresh accessToken
        return await fetchWithAuth<Response>(apiPath, options, maxRetries - 1);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        throw refreshError;
      }
    } else {
      throw error; // Rethrow the error if it's not a 401 or if retries are exhausted
    }
  }
}
