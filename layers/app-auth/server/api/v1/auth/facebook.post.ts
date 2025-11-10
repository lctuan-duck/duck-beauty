import { z } from "zod";
import type { UserAuthRes } from "#app-auth/app/types";

const bodySchema = z.object({
  token: z.string(), // Google OAuth token
});

export default defineController(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);

  const data = await $fetch<UserAuthRes>(
    `${process.env.APP_API_URL}/api/v1/auth/facebook`,
    { method: "POST", body }
  );

  await setUserSession(event, {
    user: {
      ...data.user,
      accessToken: data.token.accessToken,
      expiresAtAccess: data.token.expiresAtAccess,
    },
    secure: {
      refreshToken: data.token.refreshToken,
      expiresAtRefresh: data.token.expiresAtRefresh,
    },
  });

  return data;
});
