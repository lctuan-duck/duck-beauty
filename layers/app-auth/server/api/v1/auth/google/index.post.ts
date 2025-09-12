import { z } from "zod";
import type { UserAuthRes } from "#app-auth/types";

const bodySchema = z.object({
  credential: z.string(), // Google OAuth credential
});

export default defineController(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);

  // get device id from cookie
  const deviceId = getCookie(event, "device-id") || "";

  const data = await $fetch<UserAuthRes>(
    `${process.env.APP_API_URL}/api/v1/auth/google`,
    { method: "POST", body: { ...body, deviceId } }
  );

  await setUserSession(event, {
    user: {
      ...data.user,
      accessToken: data.token.accessToken,
      expiresAtAccess: data.token.expiresAtAccess,
      sessionId: data.token.sessionId,
    },
    secure: {
      refreshToken: data.token.refreshToken,
      expiresAtRefresh: data.token.expiresAtRefresh,
    },
  });

  return data;
});
