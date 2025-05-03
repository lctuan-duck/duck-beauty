import { login } from "#app-auth/server/services/auth";
import { z } from "zod";

const bodySchema = z.object({
  identifier: z.string().min(3).max(20),
  password: z.string().min(8).max(100),
});

export default defineController(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);

  const data = await login(body);

  await setUserSession(event, {
    user: {
      id: data.id,
      fullName: data.fullName,
      username: data.username,
      phone: data.phone,
      email: data.email,
      accessToken: data.accessToken,
      expiresAt: data.expiresAtAccess,
    },
    secure: {
      refreshToken: data.refreshToken,
      expiresAt: data.expiresAtRefresh,
    },
  });

  return data;
});
