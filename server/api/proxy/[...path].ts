import { proxyRequest, createError } from "h3";

export default defineController(async (event) => {
  const target = process.env.APP_API_URL;

  if (!target) {
    throw createError({
      statusCode: 500,
      statusMessage: "APP_API_URL is not defined",
    });
  }

  /**
   * Ví dụ:
   *   /api/proxy/v1/auth/forgot-password -> /api/v1/auth/forgot-password
   *   /api/proxy/beta/users -> /api/beta/users
   *   /api/proxy/internal/stats -> /api/internal/stats
   */
  let path: string = event.path || "";

  // Trường hợp prefix là /api/proxy/v1/
  if (path.startsWith("/api/proxy/v1/")) {
    path = path.replace("/api/proxy/v1/", "/api/v1/");
  }

  return proxyRequest(event, target + path);
});
