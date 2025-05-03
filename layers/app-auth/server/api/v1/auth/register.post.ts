import { register } from "#app-auth/server/services/auth";
import { USER_ROLE } from "#app-auth/server/dtos/auth.dto";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(8).max(100),
  fullName: z.string().min(3).max(100).optional(),
  phone: z.string().min(9).max(10).optional(),
});

export default defineController(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);

  const data = await register({
    ...body,
    role: USER_ROLE.USER,
  });

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
